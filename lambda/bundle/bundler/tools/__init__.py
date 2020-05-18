import os

tools_path = os.path.dirname(__file__)
xcursorgen = tools_path + "/xcursorgen.out"


def generate_x11(config_dir, to):
    print("Generating X11 Cursors...")

    # setup environment
    # os.environ["LD_LIBRARY_PATH"] += tools_path + "/lib"

    # generating X11 cursors
    for root, _, files in os.walk(config_dir):
        for file in files:
            cursor_name = file.replace(".in", "")
            if file.endswith(".in"):
                os.system("%s %s %s" %
                          (xcursorgen, os.path.join(root, file), to + "/" + cursor_name))


def generate_window(config_dir, to):
    # TODO
    print("Generating Window Cursors..")
