from fastapi import FastAPI
from pydantic import BaseModel
from utils import fetch_article_text, extract_keywords

app = FastAPI()

class AnalyzeRequest(BaseModel):
    url: str

@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    url = request.url
    text = fetch_article_text(url)
    if not text:
        return {"error": "Failed to fetch article text"}
    
    keywords = extract_keywords(text, top_n=30)
    return {"words": keywords}
