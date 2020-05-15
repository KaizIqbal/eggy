import os
import glob

# modules
from . import helpers


def generate_sizes(imgs_dir, cursor_sizes):
    pass


def generate_xcur_config(imgs_dir, cursor_sizes):
    pass


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
    static_cursors = helpers.get_cursor_list(imgs_dir)
    animated_cursors = helpers.get_cursor_list(imgs_dir, animated=True)
