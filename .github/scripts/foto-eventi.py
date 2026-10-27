"""Rimpicciolisce le foto caricate dal pannello (assets/img/eventi).

Lato lungo al massimo 1600 px, orientamento corretto e dati EXIF tolti
(data, modello del telefono, posizione GPS). Le foto già a posto non si toccano,
così lo script si può rilanciare quante volte si vuole.
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps

LATO = 1600
cartella = Path(sys.argv[1] if len(sys.argv) > 1 else "assets/img/eventi")

for f in sorted(cartella.iterdir()):
    if f.suffix.lower() not in (".jpg", ".jpeg", ".png", ".webp"):
        continue
    with Image.open(f) as im:
        exif = bool(im.info.get("exif")) or bool(im.getexif())
        if max(im.size) <= LATO and not exif:
            continue
        prima = f.stat().st_size
        colori = im.info.get("icc_profile")
        im = ImageOps.exif_transpose(im)
        im.thumbnail((LATO, LATO), Image.LANCZOS)
        formato = f.suffix.lower()
        if formato in (".jpg", ".jpeg"):
            im.convert("RGB").save(f, "JPEG", quality=82, optimize=True, progressive=True, icc_profile=colori)
        elif formato == ".webp":
            im.save(f, "WEBP", quality=80, method=6, icc_profile=colori)
        else:
            im.save(f, "PNG", optimize=True, icc_profile=colori)
    print(f"{f.name}: {prima // 1024} KB → {f.stat().st_size // 1024} KB")
