import os

from . import generator, tools, template


def create_bundle(imgs_dir, cursor_type, cursor_sizes):
    """ Create Bundle from raw images """
    generator.generate_config(imgs_dir, cursor_sizes)
    ref = template.generate_x11_template("abcd")

    if cursor_type == "LINUX":
        tools.generate_x11(ref)
    elif cursor_type == "WINDOW":
        tools.generate_window(ref)
    else:
        tools.generate_x11(ref)
        tools.generate_window(ref)
    return "bundle"
