import json
import requests

file_expire = '1w'
url = 'https://file.io/?expires=' + file_expire


def upload(file_path: str) -> json:
    files = {
        'file': open(file_path, 'rb'),
    }
    response = requests.post(url, files=files)
    res = json.loads(response.text)
    del res['success']

    return res
