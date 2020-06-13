import json
import os
import tempfile
import shutil
import clickgen

# modules
import configsgen
import s3


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

    if(type == 'WINDOW'):
        print("📦 Creating Window bundle...")
        clickgen.main(name, config_dir=imgs_dir,
                      out_path=out_dir, win=True, archive=True)
    elif(type == 'LINUX'):
        print("📦 Creating Linux bundle...")
        clickgen.main(name, config_dir=imgs_dir,
                      out_path=out_dir, x11=True, archive=True)
    else:
        print("📦 Creating all types bundle...")
        clickgen.main(name, config_dir=imgs_dir,
                      out_path=out_dir, x11=True, win=True, archive=True)

    bundle_path = os.path.join(out_dir, name+'.tar')
    bundle_url = s3.upload_file_temp(bundle_path, key)

    print('🧹 Cleaning resources..')
    shutil.rmtree(imgs_dir)

    response = {
        "statusCode": 200,
        "url": json.dumps(bundle_url)
    }

    return response
