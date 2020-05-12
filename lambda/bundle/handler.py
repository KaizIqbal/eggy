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
    bundler.config.CURSOR_TYPE = event["type"]
    bundler.config.DPI = event["sizes"]
    bundler.config.WORK_DIR = dir
    bundler.config.RAW_DIR = dir + "/raw/"

    print("🚛 Fetching resources from S3...")
    fetch.directory_from_s3(s3_dir=key, local_dir=dir)

    print("🔥 Generating config files...")
    bundler.generate_ini()

    print("📦 Creating bundle...")
    bundle = bundler.create_bundle()

    response = {
        "statusCode": 200,
        "bundle": json.dumps(bundle)
    }

    return response
