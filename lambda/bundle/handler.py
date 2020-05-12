import json
import uuid

# modules
import bundler
import fetch


def bundle(event, context):

    key = event["key"]
    type = event["type"]

    # generate 8 character long unique id
    dir = str(uuid.uuid4())[:8]

    print("🚛 Fetching resources from S3...")
    fetch.directory_from_s3(s3_dir=key, out_dir=dir)

    print("📦 Creating Cursor Bundle...")
    bundle = bundler.create_bundle(imgs_dir=key, cursor_type=type)

    response = {
        "statusCode": 200,
        "bundle": json.dumps(bundle)
    }

    return response
