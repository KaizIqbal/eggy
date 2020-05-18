import os

from . import generator, tools, template


def create_bundle(imgs_dir, cursor_type, cursor_sizes):
    """ Create Bundle from raw images """
    generator.generate_config(imgs_dir, cursor_sizes)
    to = template.generate_x11_template("abcd")

    if cursor_type == "LINUX":
        tools.generate_x11(imgs_dir, to)
    elif cursor_type == "WINDOW":
        tools.generate_window(imgs_dir, to)
    else:
        tools.generate_x11(imgs_dir, to)
        tools.generate_window(imgs_dir, to)
    return "bundle"
