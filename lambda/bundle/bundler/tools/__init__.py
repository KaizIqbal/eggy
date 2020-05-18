import os


def generate_x11():
    print("Generating X11 Cursors...")
    # setup environment
    os.environ["LD_LIBRARY_PATH"] = os.getcwd() + "/lib"
    #  TODO
    print(os.system("./xcursorgen --help"))


def generate_window():
    # TODO
    print("Generating Window Cursors..")
