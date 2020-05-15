import json
import uuid

# modules
import bundler
import fetch


def bundle(event, context):

    key = event["key"]

    # generate 8 character long unique directory name
    dir = str(uuid.uuid4())[:8]

    # configs
    bundler.var.CURSOR_TYPE = event["type"]
    bundler.var.DPI = event["sizes"]
    bundler.var.WORK_DIR = dir

    print("🚛 Fetching resources from S3...")
    fetch.directory_from_s3(s3_dir=key, local_dir=dir)

    print("🔥 Generating helper files...")
    bundler.generate_helper()

    print("📦 Creating bundle...")
    bundle = bundler.create_bundle()

    response = {
        "statusCode": 200,
        "bundle": json.dumps(bundle)
    }

    return response
