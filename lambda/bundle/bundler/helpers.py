import os
import itertools
from PIL import Image


def sort_cursors(cursor_list):
    cursor_list.sort()
    cursor_list.sort(key=len)


def get_cursor_list(imgs_dir, animated=False):
    all_curosr_list, cursor_list = [], []

    for file_path in os.listdir(imgs_dir):
        all_curosr_list.append(os.path.basename(file_path))

    if (animated):
        # animated cursor have filename-1,2,3..n postfix
        temp = [cursor for cursor in all_curosr_list if
                cursor.find("-") >= 0]
        sort_cursors(temp)
        cursor_list = [list(g) for _, g in itertools.groupby(
            temp, lambda x: x.partition("-")[0])]
    else:
        for cursor in all_curosr_list:
            if cursor.find("-") <= 0:
                cursor_list.append(cursor)
        cursor_list.sort()

    return cursor_list


def static_cursor_config(list, imgs_dir, sizes):
    for cursor in list:
        config_file_path = imgs_dir+"/"+cursor.replace(".png", ".in")
        config_file = open(config_file_path, "w")

        for size in sizes:
            # helper variables
            sizes = (size, size)
            in_path = imgs_dir + "/" + cursor
            out_dir = imgs_dir + "/%sx%s/" % (size, size)
            out_path = out_dir+cursor
            if not os.path.exists(out_dir):
                os.makedirs(out_dir)

            # resizing & save
            im = Image.open(in_path)
            resized_im = im.resize(sizes, Image.ANTIALIAS)
            resized_im.save(out_path)

            # config file content
            # add new line on every line but not on last line
            line = "%s xhot yhot %s\n" % (size, out_path)
            if size == sizes[-1]:
                line = "%s xhot yhot %s" % (size, out_path)

            config_file.write(line)

        config_file.close()
