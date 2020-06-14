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

    imgs_dir = tempfile.mkdtemp()
    out_dir = tempfile.mkdtemp()

    print("🚛 Fetching resources from S3 to %s ..." % imgs_dir)
    s3.fetch_directory(s3_dir=key, local_dir=imgs_dir)

    print("🔧 Creating configs...")
    configsgen.generate_config(imgs_dir, sizes)

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

        # Bundle info
        bundle_name = name+'.tar'
        bundle_path = os.path.join(out_dir, bundle_name)
        bundle_size = helpers.convert_size(os.path.getsize(bundle_path))
        bundle_mime = os.path.getmtime(bundle_path)

        print('⬆ Uploading Cursor Bundle to file.io for temparary link...')
        fileio_res = fileio.upload(bundle_path)

        body = json.loads(fileio_res)
        body.update({"filename": bundle_name, "size": bundle_size,
                     "mimetype": bundle_mime})

    finally:
        print('🧹 Cleaning resources..')
        shutil.rmtree(imgs_dir)

    response = {
        "statusCode": 200,
        "body": json.dumps(body)

    }

    return response
