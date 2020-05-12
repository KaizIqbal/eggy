import boto3
import os
import uuid

region = os.environ.get("REGION")
s3_resource = boto3.resource('s3', region)
bucket = s3_resource.Bucket(os.environ.get("S3_BUCKET"))


def directory_from_s3(s3_dir, local_dir):
    """ Fetch directory from S3Bucket,Config fetched from environment variables.
        To set manually try commands ```
            export REGION=<your-region>
            export S3_BUCKET=<your-s3-bucket-name>
        ``` or create '.env' file that automatically detect by serverless
    """

    for object in bucket.objects.filter(Prefix=s3_dir):
        path = "%s/%s" % (local_dir, object.key.replace(s3_dir, ""))
        if not os.path.exists(os.path.dirname(path)):
            os.makedirs(os.path.dirname(path))
        bucket.download_file(object.key, path)
