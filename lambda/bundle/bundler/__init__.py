from . import ini, config


def generate_ini(imgs_dir=config.WORK_DIR, cursor_type=config.CURSOR_TYPE, cursor_dpi=config.SIZES):
    ini.write_xcur(imgs_dir, cursor_type, cursor_dpi)


def create_bundle():
    return "bundle"
