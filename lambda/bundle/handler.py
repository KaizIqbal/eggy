import json
import os

anicursorgen = "./tools/anicursorgen.py"


def bundle(event, context):

    # output = os.system("%s -h" % anicursorgen)
    os.environ["S3_BUCKET"]

    response = {
        "statusCode": 200,
        # "bundle": json.dumps(output)
    }

    return response
