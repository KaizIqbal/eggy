import os

# modules
from . import helpers


def generate_x11():
    print("Generating X11 Cursors...")
    # setup environment
    os.environ["LD_LIBRARY_PATH"] = os.getcwd() + "/lib"
    #  TODO
    print(os.system("./xcursorgen --help"))


def generate_window():
    # TODO
    print("Generating Window Cursors..")


def generate_config(imgs_dir, cursor_sizes):
    """ Generate helpers files."""
    helpers.generate_static_cursor(imgs_dir, cursor_sizes)
    helpers.generate_animated_cursor(imgs_dir, cursor_sizes)
