import os
import itertools
from PIL import Image


def get_cursor_list(imgs_dir, animated=False):
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


def resize_cursor(cursor, size, imgs_dir):
    # helper variables
    in_path = imgs_dir + "/" + cursor
    out_dir = imgs_dir + "/%sx%s/" % (size, size)
    out_path = out_dir + cursor

    if not os.path.exists(out_dir):
        os.makedirs(out_dir)

    # resizing & save
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
        resize = (0, offset, width, height - offset)

    thumb = image.crop(resize).resize(
        (ideal_width, ideal_height), Image.ANTIALIAS)
    thumb.save(out_path)

    xhot = int(thumb.size[0] / 2)
    yhot = int(thumb.size[1] / 2)
    return xhot, yhot


def write_xcur(config_file_path, content):
    content.sort()
    content[-1] = content[-1].rstrip("\n")
    with open(config_file_path, "w") as config_file:
        for line in content:
            config_file.write(line)
        config_file.close()


def generate_static_cursor(imgs_dir, sizes):
    list = get_cursor_list(imgs_dir)
    for cursor in list:
        config_file_path = imgs_dir + "/" + cursor.replace(".png", ".in")
        content = []

        for size in sizes:
            xhot, yhot = resize_cursor(cursor, size, imgs_dir)
            line = "%s %s %s %sx%s/%s\n" % (size,
                                            xhot, yhot, size, size, cursor)
            content.append(line)
        write_xcur(config_file_path, content)


def generate_animated_cursor(imgs_dir, sizes):
    list = get_cursor_list(imgs_dir, animated=True)
    for group in list:
        group_name = str(group[0]).split("-")[0]
        config_file_path = imgs_dir + "/" + group_name + ".in"
        content = []

        for cursor in group:
            for size in sizes:
                xhot, yhot = resize_cursor(cursor, size, imgs_dir)
                line = "%s %s %s %sx%s/%s\n" % (size,
                                                xhot, yhot, size, size, cursor)
                content.append(line)
        write_xcur(config_file_path, content)
