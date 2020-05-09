import json
import os


def bundle(event, context):

    x11 = os.system("./xcursorgen --help")
    print(x11)

    # env = os.getenv("S3_BUCKET")

    response = {
        "statusCode": 200,
    }

    return response
