from fastapi import FastAPI
from pydantic import BaseModel
from utils import fetch_article_text, extract_keywords
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # you can later restrict this to ["http://localhost:5173"]
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
