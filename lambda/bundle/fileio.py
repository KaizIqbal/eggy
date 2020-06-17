from io import BytesIO
import json

import pycurl


file_expire = '1w'
url = 'https://file.io/?expires=' + file_expire


def upload(file_path: str) -> json:
    c = pycurl.Curl()
    data = BytesIO()

    c.setopt(c.URL, url)
    c.setopt(c.HTTPPOST, [('file', (c.FORM_FILE, file_path))])
    c.setopt(pycurl.WRITEFUNCTION, data.write)
    c.setopt(pycurl.FOLLOWLOCATION, 1)
    c.setopt(pycurl.MAXREDIRS, 5)
    c.perform()

    stream_value = data.getvalue()
    decoded_res = stream_value.decode('utf-8')
    res = json.loads(decoded_res)
    del res['success']

    return res
