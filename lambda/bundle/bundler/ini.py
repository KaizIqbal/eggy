from . import config


def write_xcur(imgs_dir=config.WORK_DIR, cursor_type=config.CURSOR_TYPE, cursor_dpi=config.DPI):
    """ Generate .ini config files."""
    for dpi in cursor_dpi:
        print(dpi)
