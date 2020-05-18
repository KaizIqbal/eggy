import os
from . import generator


def create_bundle(imgs_dir, cursor_type, cursor_sizes):
    """ Create Bundle from raw images """
    generator.generate_config(imgs_dir, cursor_sizes)

    if cursor_type == "LINUX":
        generator.generate_x11()
    else:
        pass
    return "bundle"
