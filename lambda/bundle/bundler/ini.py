import os
# modules
from . import config


def write_xcur(imgs_dir=config.WORK_DIR, cursor_type=config.CURSOR_TYPE, cursor_dpi=config.SIZES):
    """ Generate .ini config files."""
    raw_dir = config.RAW_DIR
    for filename in os.listdir(raw_dir):
        print(filename)
