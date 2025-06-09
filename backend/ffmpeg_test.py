from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

model_id = "Salesforce/codet5p-770m-py"

print("Downloading model...")
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForSeq2SeqLM.from_pretrained(model_id)
print("Download complete.")
