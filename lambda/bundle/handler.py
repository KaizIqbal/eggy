import json

# modules
from bundler import fetch, ini


def bundle(event, context):

    key = event["key"]
    # type = event["type"]

    print("🚛 Fetching resources from S3...")
    fetch.directory_from_s3(key)

    print("🔥 Generating Configs...")
    ini.generate("/tmp/test")

    response = {
        "statusCode": 200,
        # "key": json.dumps(key),
        # "type": json.dumps(type)
    }

    return response
