import os
import shutil
import zipfile
from contextlib import contextmanager

tools_path = os.path.dirname(__file__)
xcursorgen = tools_path + "/xcursorgen.out"
anicursorgen = "." + tools_path + "/anicursorgen.py"


@contextmanager
def cwd(path):
    oldpwd = os.getcwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(oldpwd)


def create_archive(direcctory):
    zip_path = shutil.make_archive(direcctory, 'zip', direcctory)
    return zip_path


def get_cursor_name(path):
    with open(path, "r") as config:
        line = config.readline()
        words = line.split(" ")
    config.close()

    if(len(words) >= 4):
        return os.path.basename(path).replace(".in", ".ani")
    else:
        return os.path.basename(path).replace(".in", ".cur")


def generate_x11(config_dir, to):
    print("Generating X11 Cursors...")

    # setup environment
    # os.environ["LD_LIBRARY_PATH"] += tools_path + "/lib"

    # generating X11 cursors
    for _, _, files in os.walk(config_dir):
        for file in files:
            cursor_name = file.replace(".in", "")
            if file.endswith(".in"):
                os.system("%s %s %s" % (xcursorgen, os.path.join(
                    config_dir, file), to + "/" + cursor_name))


def generate_window(config_dir, to):
    print("Generating Window Cursors..")
    for _, _, files in os.walk(config_dir):
        for file in files:
            if file.endswith(".in"):
                path = os.path.join(config_dir, file)
                cursor_name = get_cursor_name(path)
                with cwd(config_dir):
                    os.system("%s %s %s" %
                              (anicursorgen, path, "../" + to + cursor_name))
    zip_path = create_archive(to)
    return zip_path
