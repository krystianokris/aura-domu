"""Converts docs/screenshots/*.png to .webp (smaller README) and removes the PNGs. Needs Pillow."""
import pathlib
from PIL import Image

for png in sorted(pathlib.Path("docs/screenshots").glob("*.png")):
    out = png.with_suffix(".webp")
    Image.open(png).convert("RGB").save(out, "WEBP", quality=84, method=6)
    print(out.name, out.stat().st_size)
    png.unlink()
