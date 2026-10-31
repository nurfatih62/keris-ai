"""Validasi struktur dataset keris sebelum pelatihan.

Hanya memakai pustaka standar. Belum dijalankan karena dataset belum tersedia.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path

SPLITS = ("train", "val", "test")
IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp"}
REQUIRED_METADATA = {"file", "class", "split", "source", "license"}


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def collect_images(root: Path) -> tuple[dict[str, list[Path]], list[str]]:
    images: dict[str, list[Path]] = {}
    errors: list[str] = []
    for split in SPLITS:
        split_dir = root / split
        if not split_dir.is_dir():
            errors.append(f"Folder split tidak ditemukan: {split_dir}")
            continue
        for class_dir in sorted(split_dir.iterdir()):
            if not class_dir.is_dir():
                continue
            files = [
                path
                for path in sorted(class_dir.iterdir())
                if path.is_file() and path.suffix.lower() in IMAGE_SUFFIXES
            ]
            if not files:
                errors.append(f"Kelas tanpa gambar: {class_dir}")
            images[f"{split}/{class_dir.name}"] = files
    return images, errors


def validate_metadata(root: Path, images: dict[str, list[Path]]) -> tuple[list[str], list[str], dict]:
    metadata_path = root / "metadata.csv"
    errors: list[str] = []
    warnings: list[str] = []
    summary: dict = {}

    if not metadata_path.is_file():
        warnings.append("metadata.csv tidak ditemukan; sumber dan lisensi belum tercatat.")
        return errors, warnings, summary

    with metadata_path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        fields = set(reader.fieldnames or [])
        missing = REQUIRED_METADATA - fields
        if missing:
            errors.append(f"Kolom metadata hilang: {', '.join(sorted(missing))}")
            return errors, warnings, summary

        rows = list(reader)

    known_files = {
        path.relative_to(root).as_posix(): path
        for files in images.values()
        for path in files
    }
    seen: set[str] = set()
    license_counter: Counter[str] = Counter()

    for index, row in enumerate(rows, start=2):
        file_value = (row.get("file") or "").strip()
        if file_value not in known_files:
            errors.append(f"Baris {index}: berkas tidak ditemukan ({file_value}).")
            continue
        if file_value in seen:
            errors.append(f"Baris {index}: duplikat metadata untuk {file_value}.")
        seen.add(file_value)

        split = (row.get("split") or "").strip()
        class_name = (row.get("class") or "").strip()
        expected_prefix = f"{split}/{class_name}/"
        if not file_value.startswith(expected_prefix):
            errors.append(
                f"Baris {index}: split/class tidak cocok dengan path {file_value}."
            )
        if not (row.get("source") or "").strip():
            errors.append(f"Baris {index}: sumber kosong.")
        if not (row.get("license") or "").strip():
            errors.append(f"Baris {index}: lisensi kosong.")
        license_counter[(row.get("license") or "kosong").strip()] += 1

    missing_metadata = sorted(set(known_files) - seen)
    if missing_metadata:
        errors.append(f"{len(missing_metadata)} gambar belum memiliki metadata.")

    summary["metadata_rows"] = len(rows)
    summary["licenses"] = dict(license_counter)
    return errors, warnings, summary


def main() -> int:
    parser = argparse.ArgumentParser(description="Validasi dataset gambar keris.")
    parser.add_argument("--dataset", type=Path, required=True)
    parser.add_argument("--report", type=Path, default=None)
    args = parser.parse_args()

    root: Path = args.dataset.resolve()
    if not root.is_dir():
        print(f"Dataset tidak ditemukan: {root}", file=sys.stderr)
        return 1

    images, errors = collect_images(root)
    classes_by_split = {
        split: sorted(
            {
                key.split("/", 1)[1]
                for key in images
                if key.startswith(f"{split}/")
            }
        )
        for split in SPLITS
    }
    class_sets = {split: set(classes) for split, classes in classes_by_split.items()}
    if class_sets["train"] != class_sets["val"]:
        errors.append("Daftar kelas train dan val berbeda.")
    if class_sets["train"] != class_sets["test"]:
        errors.append("Daftar kelas train dan test berbeda.")

    counts = {key: len(files) for key, files in images.items()}
    hashes: dict[str, list[str]] = defaultdict(list)
    for key, files in images.items():
        for path in files:
            hashes[sha256_file(path)].append(f"{key}/{path.name}")

    duplicates = [paths for paths in hashes.values() if len(paths) > 1]
    if duplicates:
        errors.append(f"Ditemukan {len(duplicates)} grup gambar duplikat (hash sama).")

    metadata_errors, warnings, metadata_summary = validate_metadata(root, images)
    errors.extend(metadata_errors)

    min_train = min((counts.get(f"train/{name}", 0) for name in classes_by_split["train"]), default=0)
    if min_train < 20:
        warnings.append(
            f"Kelas dengan gambar latih paling sedikit: {min_train}. Target awal belum ditetapkan."
        )

    total = sum(counts.values())
    report = {
        "dataset": str(root),
        "total_images": total,
        "classes": classes_by_split["train"],
        "counts": counts,
        "duplicate_groups": duplicates,
        "metadata": metadata_summary,
        "errors": errors,
        "warnings": warnings,
        "valid": not errors,
    }

    if args.report:
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")

    print(json.dumps(report, indent=2, ensure_ascii=False))
    return 0 if not errors else 1


if __name__ == "__main__":
    raise SystemExit(main())
