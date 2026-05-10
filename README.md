# Google Workshop - ImagineX Mini Challenge

This repository contains my workshop mini challenge code for building a simple
poster creator with Python. The project uses `Pillow` to generate a custom
poster from either an uploaded image or a built-in simple drawing.

## Workshop Goal

The goal of this workshop was to practice using Python to create a small,
interactive visual application. Instead of only writing text output, the code
produces an actual poster image that can be saved and reused.

## What I Worked On

In this mini challenge, I updated and fixed the notebook so it can run in both
Google Colab and a normal local Python environment.

The main tasks included:

- Building a poster canvas with custom colors, text, and simple graphics.
- Letting users choose between uploading their own image or using a default
  drawing.
- Adding the user's idea text to the poster.
- Saving the final poster as a PNG image.
- Fixing Colab-only dependencies so the notebook also works locally.
- Cleaning old notebook output to make the file easier to read and maintain.

## Result

The final notebook creates a poster image called `your_poster.png`.

Users can:

- Enter a short idea or theme.
- Choose image upload mode or simple drawing mode.
- Generate a 360 x 562 poster.
- Save the final result as a PNG file.

## How To Run

Open `Mini_Challenge.ipynb` in Google Colab or Jupyter Notebook, then run the
main code cell.

Required Python package:

```bash
pip install pillow
```

If running in Google Colab, the upload option uses Colab's file upload widget.
If running locally, the upload option asks for a local image path instead.
