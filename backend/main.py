from fastapi import FastAPI, UploadFile, File
from whisper_model import transcribe_audio
from codet5_model import generate_code
from utils import save_audio_file
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.post("/generate-code")
async def voice_to_code(file: UploadFile = File(...)):
  # 1. save uploaded audio file
  audio_path = save_audio_file(file)

  # 2. transcribe to text using whisper
  instruction = transcribe_audio(audio_path)

  # 3. generate code using CodeT5
  code_output = generate_code(instruction)

  return {
    "instruction": instruction,
    "code": code_output
  }
  
@app.get('/')
def home():
  return {"message": "Hello, World!"}