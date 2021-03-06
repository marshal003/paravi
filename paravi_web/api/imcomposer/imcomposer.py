import hashlib
import json
from ..tasks import run_moviepy
from celery.result import AsyncResult


def generate_hash(data):
    return hashlib.md5(json.dumps(data, sort_keys=True).encode('utf-8')).hexdigest()


def start_compose(data):
    request_id = generate_hash(data)
    job_id = run_moviepy.delay(request_id, data).id
    return request_id, job_id


def job_status(job_id):
    result = AsyncResult(job_id)
    return result.status