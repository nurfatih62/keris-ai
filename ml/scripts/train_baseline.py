"""Baseline klasifikasi keris (kerangka, belum dijalankan).

Arsitektur MobileNetV3-Small dipakai hanya sebagai titik awal eksperimen.
Pemilihan arsitektur final tetap memerlukan keputusan Bagian 7.1/12.
"""

from __future__ import annotations

import argparse
import json
import random
import time
from pathlib import Path

import torch
from torch import nn
from torch.utils.data import DataLoader
from torchvision import datasets, models, transforms
from tqdm import tqdm


def build_transforms() -> tuple[transforms.Compose, transforms.Compose]:
    # Tidak memakai flip horizontal: orientasi dan asimetri ricikan keris penting.
    train_transform = transforms.Compose(
        [
            transforms.RandomResizedCrop(224, scale=(0.8, 1.0)),
            transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.15),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ]
    )
    eval_transform = transforms.Compose(
        [
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ]
    )
    return train_transform, eval_transform


def build_model(num_classes: int, pretrained: bool) -> nn.Module:
    weights = models.MobileNet_V3_Small_Weights.DEFAULT if pretrained else None
    model = models.mobilenet_v3_small(weights=weights)
    in_features = model.classifier[-1].in_features
    model.classifier[-1] = nn.Linear(in_features, num_classes)
    return model


def evaluate_top1(model: nn.Module, loader: DataLoader, device: torch.device) -> float:
    model.eval()
    correct = 0
    total = 0
    with torch.no_grad():
        for images, targets in tqdm(loader, desc="validasi", leave=False):
            images = images.to(device)
            targets = targets.to(device)
            logits = model(images)
            predictions = logits.argmax(dim=1)
            correct += (predictions == targets).sum().item()
            total += targets.size(0)
    return correct / max(1, total)


def main() -> int:
    parser = argparse.ArgumentParser(description="Latih baseline klasifikasi keris.")
    parser.add_argument("--dataset", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--epochs", type=int, default=5)
    parser.add_argument("--batch-size", type=int, default=32)
    parser.add_argument("--learning-rate", type=float, default=1e-3)
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--no-pretrained", action="store_true")
    args = parser.parse_args()

    random.seed(args.seed)
    torch.manual_seed(args.seed)

    train_dir = args.dataset / "train"
    val_dir = args.dataset / "val"
    if not train_dir.is_dir() or not val_dir.is_dir():
        raise SystemExit("Folder train/val tidak ditemukan. Jalankan validasi dataset dulu.")

    train_transform, eval_transform = build_transforms()
    train_dataset = datasets.ImageFolder(train_dir, transform=train_transform)
    val_dataset = datasets.ImageFolder(val_dir, transform=eval_transform)

    if train_dataset.class_to_idx != val_dataset.class_to_idx:
        raise SystemExit("Daftar kelas train dan val tidak sama.")
    if len(train_dataset) == 0 or len(val_dataset) == 0:
        raise SystemExit("Dataset train/val kosong.")

    device = torch.device(
        "cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu"
    )
    train_loader = DataLoader(
        train_dataset,
        batch_size=args.batch_size,
        shuffle=True,
        num_workers=2,
        pin_memory=device.type == "cuda",
    )
    val_loader = DataLoader(
        val_dataset,
        batch_size=args.batch_size,
        shuffle=False,
        num_workers=2,
        pin_memory=device.type == "cuda",
    )

    model = build_model(len(train_dataset.classes), pretrained=not args.no_pretrained)
    model.to(device)

    for parameter in model.features.parameters():
        parameter.requires_grad = False

    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.AdamW(
        [parameter for parameter in model.parameters() if parameter.requires_grad],
        lr=args.learning_rate,
    )

    args.output.mkdir(parents=True, exist_ok=True)
    best_accuracy = 0.0
    history: list[dict] = []
    started = time.time()

    for epoch in range(args.epochs):
        model.train()
        running_loss = 0.0
        for images, targets in tqdm(train_loader, desc=f"epoch {epoch + 1}", leave=False):
            images = images.to(device)
            targets = targets.to(device)
            optimizer.zero_grad(set_to_none=True)
            logits = model(images)
            loss = criterion(logits, targets)
            loss.backward()
            optimizer.step()
            running_loss += loss.item() * targets.size(0)

        train_loss = running_loss / len(train_dataset)
        val_accuracy = evaluate_top1(model, val_loader, device)
        history.append(
            {
                "epoch": epoch + 1,
                "train_loss": round(train_loss, 6),
                "val_top1": round(val_accuracy, 6),
            }
        )
        print(json.dumps(history[-1]))

        if val_accuracy > best_accuracy:
            best_accuracy = val_accuracy
            torch.save(
                {
                    "model_state": model.state_dict(),
                    "classes": train_dataset.classes,
                    "architecture": "mobilenet_v3_small",
                    "input_size": 224,
                },
                args.output / "model.pt",
            )

    config = {
        "architecture": "mobilenet_v3_small",
        "pretrained": not args.no_pretrained,
        "epochs": args.epochs,
        "batch_size": args.batch_size,
        "learning_rate": args.learning_rate,
        "seed": args.seed,
        "classes": train_dataset.classes,
        "train_images": len(train_dataset),
        "val_images": len(val_dataset),
        "device": str(device),
        "duration_seconds": round(time.time() - started, 2),
        "best_val_top1": round(best_accuracy, 6),
        "history": history,
        "catatan": "Baseline eksperimen; bukan model produksi. Dataset dan lisensi wajib tervalidasi.",
    }
    (args.output / "config.json").write_text(
        json.dumps(config, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    print(f"Selesai. Model terbaik: {args.output / 'model.pt'}")
    print(f"Val top-1 terbaik: {best_accuracy:.4f}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
