import uuid
from . import fetch, ini


def create_bundle(imgs_dir, cursor_type):

    print("🔥 Generating Configs...")
    ini.generate(imgs_dir, out_dir=imgs_dir)

    return "bundle"
