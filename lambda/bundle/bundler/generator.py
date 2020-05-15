import os
import glob


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
    # for statis files
    for file_path in glob.glob("%s/*[!0-9].*" % imgs_dir):
        file_name = os.path.basename(file_path)
        print(file_name)

    # for animated files
    for file_path in glob.glob("%s/*[0-9].*" % imgs_dir):
        file_name = os.path.basename(file_path)
        print(file_name)
