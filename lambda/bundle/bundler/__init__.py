import os

# modules
from . import generator
from . import tools


def create_bundle(imgs_dir, cursor_type, cursor_sizes):
    """ Create Bundle from raw images """
    generator.generate_config(imgs_dir, cursor_sizes)

    if cursor_type == "LINUX":
        tools.generate_x11()
    elif cursor_type == "WINDOW":
        tools.generate_window()
    else:
        tools.generate_x11()
        tools.generate_window()

    return "bundle"
