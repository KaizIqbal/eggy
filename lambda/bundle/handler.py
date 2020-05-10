import json
import os


def bundle(event, context):

    os.environ['LD_LIBRARY_PATH'] = os.getcwd() + "/lib"

    print(os.system("./xcursorgen --help"))

    # env = os.getenv("S3_BUCKET")

    response = {
        "statusCode": 200,
    }

    return response
