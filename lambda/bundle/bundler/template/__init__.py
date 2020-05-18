import os

x11_template_path = os.path.dirname(__file__)+"/x11/"


def create_dir(dir):
    # creating diretory
    if not os.path.exists(dir):
        os.makedirs(dir)


def generate_x11_template(name, to=os.getcwd()+"/"):

    out_dir = to + name + "/"
    create_dir(out_dir)

    # generating content based on name
    for file in os.listdir(x11_template_path):
        content = []
        with open(x11_template_path + file, "r") as temp:
            for lines in temp:
                content.append(lines.replace("<NAME>", name))
        temp.close()

        with open(out_dir + file, "w") as temp:
            for line in content:
                temp.write(line)
        temp.close()

    ref = out_dir + "cursors"
    create_dir(ref)

    return ref
