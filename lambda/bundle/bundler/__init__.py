import os
from . import generator


def create_bundle(imgs_dir, cursor_type, cursor_sizes):
    """ Create Bundle from raw images """
    generator.generate(imgs_dir, cursor_sizes)

    return "bundle"
