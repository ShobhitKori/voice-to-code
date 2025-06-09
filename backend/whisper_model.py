import os

# Add FFmpeg directory to PATH
os.environ["PATH"] += os.pathsep + r"C:\ffmpeg\bin"

import whisper

model = whisper.load_model("small")

def transcribe_audio(file_path: str) -> str:
  result = model.transcribe(file_path)
  return result["text"]