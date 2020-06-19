import os
import itertools
from PIL import Image

from .types import List, Num


def get_cursor_list(imgs_dir: str, animated: bool = False) -> list:
    all_curosr_list, cursor_list = [], []

    for file_path in os.listdir(imgs_dir):
        all_curosr_list.append(os.path.basename(file_path))

    if (animated):
        # animated cursor have filename-01,02,03..n postfix
        temp = [cursor for cursor in all_curosr_list if
                cursor.find("-") >= 0]
        temp.sort()
        cursor_list = [list(g) for _, g in itertools.groupby(
            temp, lambda x: x.partition("-")[0])]
    else:
        for cursor in all_curosr_list:
            if cursor.find("-") <= 0:
                cursor_list.append(cursor)
        cursor_list.sort()
    return cursor_list


def resize_cursor(cursor: str, size: Num, imgs_dir: str, xhot, yhot) -> List[Num]:
    # helper variables
    in_path = imgs_dir + "/" + cursor
    out_dir = imgs_dir + "/%sx%s/" % (size, size)
    out_path = out_dir + cursor

    if not os.path.exists(out_dir):
        os.makedirs(out_dir)

    # opening original image
    image = Image.open(in_path)

    width = image.size[0]
    height = image.size[1]

    aspect = width / float(height)

    ideal_width = size
    ideal_height = size

    ideal_aspect = ideal_width / float(ideal_height)

    if aspect > ideal_aspect:
        # Then crop the left and right edges:
        new_width = int(ideal_aspect * height)
        offset = (width - new_width) / 2
        resize = (offset, 0, width - offset, height)
    else:
        # ... crop the top and bottom:
        new_height = int(width / ideal_aspect)
        offset = (height - new_height) / 2
        resize = (0, offset, width, height-offset)

    thumb = image.crop(resize).resize(
        (ideal_width, ideal_height), Image.ANTIALIAS)

    # save resized image
    thumb.save(out_path)

    #  finding new X & Y coordinates
    if xhot == None or yhot == None:
        Rx = int(width / 2)
        Ry = int(height / 2)
    else:
        Rx = round(size / width * xhot)
        Ry = round(size / height * yhot)

    return Rx, Ry


def write_xcur(config_file_path: str, content: list) -> None:
    content.sort()
    content[-1] = content[-1].rstrip("\n")
    with open(config_file_path, "w") as config_file:
        for line in content:
            config_file.write(line)
        config_file.close()


def generate_static_cursor(imgs_dir: str, sizes: List[Num], hotspots: any) -> None:
    list = get_cursor_list(imgs_dir)
    for cursor in list:

        config_file_path = os.path.join(
            imgs_dir, cursor.replace(".png", ".in"))
        content = []

        # Hotspots
        cursor_name = cursor.split('.')[0]
        try:
            hotspot = hotspots[cursor_name]
            xhot = hotspot['xhot']
            yhot = hotspot['yhot']
        except TypeError:
            xhot = None
            yhot = None

        for size in sizes:
            resized_xhot, resized_yhot = resize_cursor(
                cursor, size, imgs_dir, xhot=xhot, yhot=yhot)
            print('%s hotspots resized %s(x) %s(y) to %s(x) %s(y)' %
                  (cursor_name, xhot, yhot, resized_xhot, resized_yhot))
            line = "%s %s %s %sx%s/%s\n" % (size,
                                            resized_xhot, resized_yhot, size, size, cursor)
            content.append(line)
        write_xcur(config_file_path, content)


def generate_animated_cursor(imgs_dir: str, sizes: List[Num], hotspots: any):
    list = get_cursor_list(imgs_dir, animated=True)
    delay = 20
    for group in list:
        group_name = str(group[0]).split("-")[0]
        config_file_path = os.path.join(imgs_dir, group_name + ".in")
        content = []

        # Hotspots
        try:
            hotspot = hotspots[group_name]
            xhot = hotspot['xhot']
            yhot = hotspot['yhot']
        except TypeError:
            xhot = None
            yhot = None

        for cursor in group:
            for size in sizes:
                resized_xhot, resized_yhot = resize_cursor(
                    cursor, size, imgs_dir, xhot=xhot, yhot=yhot)
                print('%s hotspots resized %s(x) %s(y) to %s(x) %s(y)' %
                      (group_name, xhot, yhot, resized_xhot, resized_yhot))
                line = "%s %s %s %sx%s/%s %s\n" % (size,
                                                   resized_xhot, resized_yhot, size, size, cursor, delay)
            content.append(line)
        write_xcur(config_file_path, content)
