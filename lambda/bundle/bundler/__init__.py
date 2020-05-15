import os
from . import ini, var


def generate_helper(imgs_dir=var.WORK_DIR, cursor_type=var.CURSOR_TYPE, cursor_dpi=var.SIZES):
    """ Generate helpers files."""
    for filename in os.listdir(imgs_dir):
        print(filename)


def create_bundle():
    return "bundle"
