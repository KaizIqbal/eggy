import os


def generate_helper(imgs_dir, cursor_sizes):
    """ Generate helpers files."""
    print(imgs_dir)
    for filename in os.listdir(imgs_dir):
        print(filename)


def create_bundle(imgs_dir, cursor_type, cursor_sizes):

    generate_helper(imgs_dir, cursor_sizes)

    return "bundle"
