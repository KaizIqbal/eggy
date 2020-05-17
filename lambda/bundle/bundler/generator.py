import os
import glob

# modules
from . import helpers


def x11():
    print("Generating X11 Cursors...")
    # setup environment
    os.environ["LD_LIBRARY_PATH"] = os.getcwd() + "/lib"
    #  TODO
    print(os.system("./xcursorgen --help"))


def window():
    # TODO
    print("Generating Window Cursors..")


def all():
    # TODO
    print("Generating Window Cursors")
    print("Generating X11 Cursors")


def generate_helper(imgs_dir, cursor_sizes):
    """ Generate helpers files."""
    # Configure static cursors
    static_list = helpers.get_cursor_list(imgs_dir)
    helpers.static_cursor(static_list, imgs_dir, cursor_sizes)

    # configure animated cursors
    animated_cursors_groups = helpers.get_cursor_list(imgs_dir, animated=True)
    helpers.animated_cursor(animated_cursors_groups, imgs_dir, cursor_sizes)
