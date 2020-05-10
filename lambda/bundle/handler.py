import boto3
import json
import os


def generate_x11():
    os.environ['LD_LIBRARY_PATH'] = os.getcwd() + "/lib"
    print(os.system("./xcursorgen --help"))


def bundle(event, context):

    _, key, type = event

    response = {
        "statusCode": 200,
        "key": json.dumps(key),
        "type": json.dumps(type)
    }

    return response
