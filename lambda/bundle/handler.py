import json
import os

anicursorgen = "./tools/anicursorgen.py"


def bundle(event, context):

    # output = os.system("%s -h" % anicursorgen)

    response = {
        "statusCode": 200,
        # "bundle": json.dumps(output)
    }

    return response
