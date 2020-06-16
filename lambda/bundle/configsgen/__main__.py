
import os
import typing

# types
from .types import List, Num
# modules
from . import helpers


def generate_config(imgs_dir: str, cursor_sizes: List[Num], hotspots: any) -> str:
    """ Generate helpers files."""
    helpers.generate_static_cursor(
        imgs_dir, sizes=cursor_sizes, hotspots=hotspots)
    helpers.generate_animated_cursor(
        imgs_dir, sizes=cursor_sizes, hotspots=hotspots)

    return (os.path.abspath(imgs_dir))
