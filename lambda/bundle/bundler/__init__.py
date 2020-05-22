import os

from . import generator, tools, template


def create_bundle(imgs_dir, cursor_type, cursor_sizes):
    """ Create Bundle from raw images """
    config_dir = generator.generate_config(imgs_dir, cursor_sizes)

    bundle_path = None

    if cursor_type == "LINUX":
        to = template.generate_x11_template("abcd")
        bundle_path = tools.generate_x11(config_dir, to)
    elif cursor_type == "WINDOW":
        to = template.generate_win_template("abcd")
        bundle_path = tools.generate_window(config_dir, to)
    else:
        pass

    return bundle_path
