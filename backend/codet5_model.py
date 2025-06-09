# from transformers import pipeline

# #load Codet5 model
# code_pipeline = pipeline("text-generation", model="Salesforce/codet5-base")

# def generate_code(instruction: str) -> str:
#   result = code_pipeline(instruction, max_length=256, clean_up_tokenization_spaces=True)
#   return result[0]["generated_text"]


# from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# tokenizer = AutoTokenizer.from_pretrained("./models", trust_remote_code=True)
# model = AutoModelForSeq2SeqLM.from_pretrained("./models", trust_remote_code=True)


# def generate_code(instruction: str) -> str:
#     prompt = f"Generate Python code for the following instruction: {instruction}"

#     inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True)
#     output = model.generate(**inputs, max_length=256)
#     generated_code = tokenizer.decode(output[0], skip_special_tokens=True)

#     return generated_code

# from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# tokenizer = AutoTokenizer.from_pretrained("./models")
# model = AutoModelForSeq2SeqLM.from_pretrained("./models")

# def generate_code(instruction: str) -> str:
#     prompt = f"Generate Python code: {instruction}"
#     inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True)
#     output = model.generate(**inputs, max_length=256)
#     return tokenizer.decode(output[0], skip_special_tokens=True)

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Global variables but not initialized
tokenizer = None
model = None

def load_model():
    global tokenizer, model
    if tokenizer is None or model is None:
        print("Loading CodeT5 model...")
        tokenizer = AutoTokenizer.from_pretrained("Salesforce/codet5p-770m-py")
        model = AutoModelForSeq2SeqLM.from_pretrained("Salesforce/codet5p-770m-py")
        print("Model loaded.")

def generate_code(instruction: str) -> str:
    load_model()  # Ensure model is loaded before use
    prompt = f"# Instruction: {instruction}\n# Python Code:\n"

    inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True)
    output = model.generate(**inputs, max_length=256)
    return tokenizer.decode(output[0], skip_special_tokens=True)
