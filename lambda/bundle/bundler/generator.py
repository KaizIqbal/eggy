import os
import glob
from PIL import Image

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
    static_cursors_list = helpers.get_cursor_list(imgs_dir)

    for cursor in static_cursors_list:
        config_file_path = imgs_dir+"/"+cursor.replace(".png", ".in")
        config_file = open(config_file_path, "w")

        for size in cursor_sizes:
            # helper variables
            sizes = (size, size)
            in_path = imgs_dir + "/" + cursor
            out_dir = imgs_dir + "/%sx%s/" % (size, size)
            out_path = out_dir+cursor
            if not os.path.exists(out_dir):
                os.makedirs(out_dir)

            # resizing & save
            im = Image.open(in_path)
            resized_im = im.resize(sizes, Image.ANTIALIAS)
            resized_im.save(out_path)

            # config file content
            # add new line on every line but not on last line
            line = "%s xhot yhot %s\n" % (size, out_path)
            if size == cursor_sizes[-1]:
                line = "%s xhot yhot %s" % (size, out_path)

            config_file.write(line)

        config_file.close()

    # configure animated cursors
    animated_cursors_groups = helpers.get_cursor_list(imgs_dir, animated=True)
