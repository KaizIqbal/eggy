import os
import itertools
from PIL import Image


def get_cursor_list(imgs_dir, animated=False):
    all_curosr_list, cursor_list = [], []

    for file_path in os.listdir(imgs_dir):
        all_curosr_list.append(os.path.basename(file_path))

    if (animated):
        # animated cursor have filename-1,2,3..n postfix
        temp = [cursor for cursor in all_curosr_list if
                cursor.find("-") >= 0]
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


def static_cursor(list, imgs_dir, sizes):
    sizes_len = len(sizes) - 1

    for cursor in list:
        config_file_path = imgs_dir + "/" + cursor.replace(".png", ".in")
        with open(config_file_path, "w") as config_file:
            for index, size in enumerate(sizes):
                resize_cursor(cursor, size, imgs_dir)
                # config file content
                line = "%s xhot yhot %sx%s/%s\n" % (size, size, size, cursor)
                if (index == sizes_len):
                    line = "%s xhot yhot %sx%s/%s" % (size, size, size, cursor)
                config_file.write(line)
            config_file.close()


def animated_cursor(list, imgs_dir, sizes):
    sizes_len = len(sizes)
    for group in list:
        group_name = str(group[0]).split("-")[0]
        config_file_path = imgs_dir + "/" + group_name + ".in"
        # generate config content
        content = []
        for cursor in group:
            for index, size in enumerate(sizes):
                resize_cursor(cursor, size, imgs_dir)

                # config file content
                line = "%s xhot yhot %sx%s/%s\n" % (size, size, size, cursor)
                if (index == sizes_len):
                    line = "%s xhot yhot %sx%s/%s" % (size, size, size, cursor)
                content.append(line)
        # sort & writing to file
        content.sort()
        with open(config_file_path, "w") as config_file:
            for line in content:
                config_file.write(line)
            config_file.close()
