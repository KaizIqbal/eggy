import json
import os

anicursorgen = "./tools/anicursorgen.py"
xcursorgen = "./tools/xcursorgen"


def bundle(event, context):

    win = os.system("%s -h" % anicursorgen)
    x11 = os.system("%s --help" % xcursorgen)
    env = os.environ["S3_BUCKET"]

    response = {
        "statusCode": 200,
        "win": json.dumps(win),
        "x11": json.dumps(x11),
        "env": json.dumps(env)
    }

    return response
