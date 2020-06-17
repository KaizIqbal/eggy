from contextlib import contextmanager
import os
import math
import string
import random


@contextmanager
def LDD(path):

    LIB = os.environ['LD_LIBRARY_PATH']

    os.environ['LD_LIBRARY_PATH'] = LIB + ':' + path
    try:
        yield
    finally:
        os.environ['LD_LIBRARY_PATH'] = LIB


def convert_size(size_bytes: int) -> str:
    if size_bytes == 0:
        return "0B"
    size_name = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
    i = int(math.floor(math.log(size_bytes, 1024)))
    p = math.pow(1024, i)
    s = round(size_bytes / p, 2)
    return "%s %s" % (s, size_name[i])


def generate_random_id() -> str:
    """
        Generate 8 characcter long unique id
    """
    random_id = ''.join([random.choice(string.ascii_letters
                                       + string.digits) for n in range(8)])
    return random_id
