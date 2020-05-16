import os
import itertools


def get_cursor_list(imgs_dir, animated=False):
    all_curosr_list, cursor_list = [], []

    for file_path in os.listdir(imgs_dir):
        all_curosr_list.append(os.path.basename(file_path))

    if (animated):
        # animated cursor have filename-1,2,3..n postfix
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
