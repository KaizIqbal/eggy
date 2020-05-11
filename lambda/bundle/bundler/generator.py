import os


def x11():
    print("Generating X11 Cursors...")
    # setup environment
    os.environ["LD_LIBRARY_PATH"] = os.getcwd() + "/lib"
    print(os.system("./xcursorgen --help"))


def window():
    print("Generating Window Cursors..")


def all():
    print("Generating Window Cursors")
    print("Generating X11 Cursors")
