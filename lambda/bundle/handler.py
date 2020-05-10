import boto3
import json
import os
import uuid

region = os.environ.get("REGION")
bucket = os.environ.get("S3_BUCKET")


def downloadDirectoryFroms3(bucketName, remoteDirectoryName):
    s3_resource = boto3.resource('s3', region)
    bucket = s3_resource.Bucket(bucketName)
    for object in bucket.objects.filter(Prefix=remoteDirectoryName):
        if not os.path.exists(os.path.dirname(object.key)):
            os.makedirs(os.path.dirname(object.key))
        bucket.download_file(object.key, object.key)


def generate_x11():
    os.environ["LD_LIBRARY_PATH"] = os.getcwd() + "/lib"
    print(os.system("./xcursorgen --help"))


def bundle(event, context):

    key = event["key"]
    # type = event["type"]

    downloadDirectoryFroms3(bucket, key)

    response = {
        "statusCode": 200,
        # "key": json.dumps(key),
        # "type": json.dumps(type)
    }

    return response
