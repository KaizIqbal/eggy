import json
import os
import uuid

# modules
import bundler
import s3


def bundle(event, context):

    key = event["key"]
    type = event["type"]
    sizes = event["sizes"]

    # generate 8 character long unique directory name
    dir = str(uuid.uuid4())[:8]

    print("🚛 Fetching resources from S3 to %s ..." % dir)
    s3.fetch_directory(s3_dir=key, local_dir=dir)

    print("📦 Creating bundle...")
    bundle_path = bundler.create_bundle(dir, type, sizes)

    bundle_url = s3.upload_file_temp(bundle_path, key)

    response = {
        "statusCode": 200,
        "url": json.dumps(bundle_url)
    }

    return response
