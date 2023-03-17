from PIL import Image
import sys

def resize_by_percentage(image, outfile, percentage):
    with Image.open (image) as im:
        width, height = im.size
        resized_dimensions = (int(width * percentage), int(height * 
percentage))
        resized = im.resize(resized_dimensions)
        resized.save(outfile)

resize_by_percentage(sys.argv[1], "logo.png", float(sys.argv[2]))
