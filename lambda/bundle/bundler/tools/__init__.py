import os

tools_path = os.path.dirname(__file__)
xcursorgen = tools_path + "/xcursorgen.out"
anicursorgen = tools_path + "/anicursorgen.py"


def get_cursor_name(path):
    with open(path, "r") as config:
        line = config.readline()
        words = line.split(" ")

        if(len(words) >= 4):
            return os.path.basename(path).replace(".in", ".ani")
        else:
            return os.path.basename(path).replace(".in", ".cur")
    config.close()


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
    print("Generating Window Cursors..")
    for root, _, files in os.walk(config_dir):
        for file in files:

            if file.endswith(".in"):
                path = os.path.join(root, file)
                cursor_name = get_cursor_name(path)
                os.system("%s %s %s" %
                          (anicursorgen, path, to + "/" + cursor_name))
