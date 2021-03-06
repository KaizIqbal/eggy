import os
import json
import shutil
import tempfile

# modules
import s3
import clickgen
import configsgen
import fileio
import helpers


def bundle(event, context):
    name = event["name"]
    key = event["key"]
    type = event["type"]
    sizes = event["sizes"]

    # TODO:Hotspots
    # hotspots = event["hotspots"]

    imgs_dir = tempfile.mkdtemp()
    out_dir = tempfile.mkdtemp()

    print("🚛 Fetching resources from S3 to %s ..." % imgs_dir)
    s3.fetch_directory(s3_dir=key, local_dir=imgs_dir)

    print("🔧 Creating configs...")
    # TODO:Hotspots
    configsgen.generate_config(
        imgs_dir=imgs_dir, cursor_sizes=sizes, hotspots=None)

    try:
        if(type == 'WINDOW'):
            print("📦 Creating Window bundle...")
            clickgen.main(name, config_dir=imgs_dir,
                          out_path=out_dir, win=True, archive=True, logs=True)
        elif(type == 'LINUX'):
            print("📦 Creating Linux bundle...")
            clickgen.main(name, config_dir=imgs_dir,
                          out_path=out_dir, x11=True, archive=True, logs=True)
        else:
            print("📦 Creating all types bundle...")
            clickgen.main(name, config_dir=imgs_dir,
                          out_path=out_dir, x11=True, win=True, archive=True, logs=True)

        # rename the cursor bundle with unique id
        original_bundle_name = name + '.tar'
        random_id = helpers.generate_random_id()
        bundle_name = name + '-' + random_id + '.tar'
        shutil.move(os.path.join(out_dir, original_bundle_name),
                    os.path.join(out_dir, bundle_name))

        # Bundle info
        bundle_path = os.path.join(out_dir, bundle_name)
        bundle_size = helpers.convert_size(os.path.getsize(bundle_path))

        print('📤 Uploading File to file.io...')
        fileio_res = fileio.upload(bundle_path)

        body = fileio_res
        body["filename"] = bundle_name
        body["size"] = bundle_size

    finally:
        print('🧹 Cleaning resources..')
        shutil.rmtree(imgs_dir)

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response
