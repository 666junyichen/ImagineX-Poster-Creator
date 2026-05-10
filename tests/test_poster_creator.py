import tempfile
import unittest
from pathlib import Path

from PIL import Image

from poster_creator import EventDetails, create_event_poster, wrap_text


class PosterCreatorTests(unittest.TestCase):
    def test_wrap_text_keeps_lines_within_limit(self):
        lines = wrap_text(
            "Build a creative poster generator for an interactive Python workshop",
            max_chars=24,
        )

        self.assertGreater(len(lines), 1)
        self.assertTrue(all(len(line) <= 24 for line in lines))

    def test_create_event_poster_saves_png_with_expected_size(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            output_path = Path(temp_dir) / "poster.png"
            details = EventDetails(
                title="ImagineX Creative Lab",
                date="11 May 2026",
                time="2:00 PM",
                place="Google Workshop",
                description="A hands-on mini challenge for turning ideas into polished event posters.",
            )

            create_event_poster(details, output_path=output_path)

            self.assertTrue(output_path.exists())
            with Image.open(output_path) as image:
                self.assertEqual(image.format, "PNG")
                self.assertEqual(image.size, (768, 1086))
                self.assertEqual(image.mode, "RGB")


if __name__ == "__main__":
    unittest.main()
