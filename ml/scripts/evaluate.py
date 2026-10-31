"""Evaluasi model keris pada data uji (kerangka, belum dijalankan)."""

from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path

import torch
from sklearn.metrics import classification_report, confusion_matrix
from torch import nn
from torch.utils.data import DataLoader
from torchvision import datasets, models, transforms


def build_model(num_classes: int) -> nn.Module:
    model = models.mobilenet_v3_small(weights=None)
    in_features = model.classifier[-1].in_features
    model.classifier[-1] = nn.Linear(in_features, num_classes)
    return model


def main() -> int:
    parser = argparse.ArgumentParser(description="Evaluasi model klasifikasi keris.")
    parser.add_argument("--checkpoint", type=Path, required=True)
    parser.add_argument("--test-dir", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--batch-size", type=int, default=32)
    args = parser.parse_args()

    checkpoint = torch.load(args.checkpoint, map_location="cpu")
    classes = checkpoint.get("classes")
    if not classes:
        raise SystemExit("Checkpoint tidak memiliki daftar kelas.")

    transform = transforms.Compose(
        [
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ]
    )
    test_dataset = datasets.ImageFolder(args.test_dir, transform=transform)
    if test_dataset.classes != classes:
        raise SystemExit("Kelas data uji berbeda dengan kelas checkpoint.")

    loader = DataLoader(test_dataset, batch_size=args.batch_size, shuffle=False, num_workers=2)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = build_model(len(classes))
    model.load_state_dict(checkpoint["model_state"])
    model.to(device)
    model.eval()

    targets_all: list[int] = []
    top1_all: list[int] = []
    top3_hits = 0
    top1_hits = 0

    with torch.no_grad():
        for images, targets in loader:
            images = images.to(device)
            logits = model(images)
            top3 = logits.topk(min(3, len(classes)), dim=1).indices.cpu()
            predictions = top3[:, 0]

            targets_all.extend(targets.tolist())
            top1_all.extend(predictions.tolist())
            top1_hits += (predictions == targets).sum().item()
            top3_hits += sum(
                target.item() in row.tolist() for target, row in zip(targets, top3)
            )

    total = len(test_dataset)
    labels = list(range(len(classes)))
    report = classification_report(
        targets_all,
        top1_all,
        labels=labels,
        target_names=classes,
        output_dict=True,
        zero_division=0,
    )
    matrix = confusion_matrix(targets_all, top1_all, labels=labels).tolist()

    metrics = {
        "total_test_images": total,
        "classes": classes,
        "top1_accuracy": round(top1_hits / max(1, total), 6),
        "top3_accuracy": round(top3_hits / max(1, total), 6),
        "per_class": report,
        "confusion_matrix": matrix,
        "catatan": "Evaluasi baseline. Bandingkan dengan target pada Bagian 11.5 sebelum dipakai.",
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(metrics, indent=2, ensure_ascii=False), encoding="utf-8")

    matrix_path = args.output.with_suffix(".confusion.csv")
    with matrix_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle)
        writer.writerow(["actual\\predicted", *classes])
        for class_name, row in zip(classes, matrix):
            writer.writerow([class_name, *row])

    print(json.dumps({key: metrics[key] for key in ("top1_accuracy", "top3_accuracy")}, indent=2))
    print(f"Metrik ditulis ke {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
