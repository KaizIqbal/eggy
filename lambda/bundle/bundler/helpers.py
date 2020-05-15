import os


def get_cursor_list(imgs_dir, animated=False):
    all_curosr_list, list = [], []

    for file_path in os.listdir(imgs_dir):
        all_curosr_list.append(os.path.basename(file_path))

    if (animated):
        # animated cursor have filename-1,2,3..n postfix
        list = [i for i in all_curosr_list if str(i).find("-") >= 0]
    else:
        list = [i for i in all_curosr_list if str(i).find("-") <= 0]

    list.sort()
    return list
