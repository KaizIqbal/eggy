import json
import os
import uuid

# modules
import bundler
import fetch


def bundle(event, context):

    key = event["key"]
    type = event["type"]
    sizes = event["sizes"]

    # generate 8 character long unique directory name
    dir = str(uuid.uuid4())[:8]

    print("🚛 Fetching resources from S3 to %s ..." % dir)
    fetch.directory_from_s3(s3_dir=key, local_dir=dir)

    print("📦 Creating bundle...")
    bundle_path = bundler.create_bundle(dir, type, sizes)

    response = {
        "statusCode": 200,
        "bundle_path": json.dumps(bundle_path)
    }

    return response
