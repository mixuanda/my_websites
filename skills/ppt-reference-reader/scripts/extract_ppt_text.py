#!/usr/bin/env python3
import sys
import html
import re
import zipfile
from pathlib import Path


def extract_text(input_path: Path, output_path: Path) -> None:
    if input_path.suffix.lower() != ".pptx":
        raise ValueError("This extractor reads .pptx files. Use strings fallback for legacy .ppt files.")

    lines = []
    with zipfile.ZipFile(input_path) as archive:
        slide_names = [
            name
            for name in archive.namelist()
            if name.startswith("ppt/slides/slide") and name.endswith(".xml")
        ]
        slide_names.sort(key=lambda name: int(re.search(r"slide(\d+)\.xml$", name).group(1)))

        for slide_name in slide_names:
            slide_number = re.search(r"slide(\d+)\.xml$", slide_name).group(1)
            xml = archive.read(slide_name).decode("utf-8", errors="ignore")
            text_runs = [
                html.unescape(match)
                for match in re.findall(r"<a:t>(.*?)</a:t>", xml)
                if match.strip()
            ]

            lines.append(f"# Slide {slide_number}")
            if text_runs:
                lines.extend(text_runs)
            lines.append("")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text("\n".join(lines), encoding="utf-8")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: extract_ppt_text.py <input.pptx> <output.txt>", file=sys.stderr)
        sys.exit(1)
    extract_text(Path(sys.argv[1]), Path(sys.argv[2]))
