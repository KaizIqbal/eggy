import json
import os
import tempfile
import shutil


# modules
import configsgen
import s3


def bundle(event, context):

    key = event["key"]
    type = event["type"]
    sizes = event["sizes"]

    dir = tempfile.mkdtemp()

    print("🚛 Fetching resources from S3 to %s ..." % dir)
    s3.fetch_directory(s3_dir=key, local_dir=dir)

    # print("🔧 Creating configs...")

    # bundle_url = s3.upload_file_temp(bundle_path, key)
    print('🧹 Cleaning resources..')
    shutil.rmtree(dir)

    response = {
        "statusCode": 200,
        # "url": json.dumps(bundle_url)
        "url": "hurray!"
    }

    return response
