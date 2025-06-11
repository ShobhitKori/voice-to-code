import os
import whisper
import logging

# Add FFmpeg directory to PATH
# os.environ["PATH"] += os.pathsep + r"C:\ffmpeg\bin" 

WHISPER_MODEL_DIR = "/data/whisper-small"

model = whisper.load_model("small", download_root=WHISPER_MODEL_DIR)

# def transcribe_audio(file_path: str) -> str:
#   result = model.transcribe(file_path)
#   return result["text"]

logging.basicConfig(level=logging.INFO)

def transcribe_audio(file_path):
    logging.info("Starting transcription for %s", file_path)
    result = model.transcribe(file_path)
    logging.info("Transcription completed")
    return result["text"]
