
import os
import typing

# types
from .types import List, Num
# modules
from . import helpers


def generate_config(imgs_dir: str, cursor_sizes: List[Num]) -> str:
    """ Generate helpers files."""
    helpers.generate_static_cursor(imgs_dir, cursor_sizes)
    helpers.generate_animated_cursor(imgs_dir, cursor_sizes)

    return (os.path.abspath(imgs_dir))
