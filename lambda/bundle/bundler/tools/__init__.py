import os

tools_path = os.path.dirname(__file__)
xcursorgen = tools_path + "/xcursorgen.out"


def generate_x11():
    print("Generating X11 Cursors...")

    # setup environment
    # os.environ["LD_LIBRARY_PATH"] += tools_path + "/lib"

    # generating X11 cursors

    os.system("%s --help" % xcursorgen)


def generate_window():
    # TODO
    print("Generating Window Cursors..")
