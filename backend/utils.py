import os
from fastapi import UploadFile

AUDIO_DIR = "audio_files"

os.makedirs(AUDIO_DIR, exist_ok=True)

def save_audio_file(file: UploadFile) -> str:
  file_path = os.path.join(AUDIO_DIR, file.filename)
  with open(file_path, "wb") as buffer:
    buffer.write(file.file.read())
  return file_path