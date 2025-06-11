import os
import uvicorn
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
    audio_path = save_audio_file(file)
    instruction = transcribe_audio(audio_path)
    code_output = generate_code(instruction)
    return {
        "instruction": instruction,
        "code": code_output
    }

@app.get("/")
def home():
    return {"message": "Hello, World!"}


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # use PORT from env if available
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
