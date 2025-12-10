import requests
from bs4 import BeautifulSoup
from sklearn.feature_extraction.text import TfidfVectorizer
import re

def fetch_article_text(url: str) -> str:
    try:
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")
        paragraphs = soup.find_all("p")
        text = " ".join(p.get_text() for p in paragraphs)
        cleaned_text = re.sub(r"\s+", " ", text).strip()
        return cleaned_text
    except:
        return ""

def extract_keywords(text: str, top_n: int = 30):
    vectorizer = TfidfVectorizer(stop_words="english", max_features=top_n)
    tfidf_matrix = vectorizer.fit_transform([text])
    scores = tfidf_matrix.toarray()[0]
    feature_names = vectorizer.get_feature_names_out()

    keywords = [
        {"word": feature_names[i], "weight": float(scores[i])}
        for i in scores.argsort()[::-1]
    ]
    return keywords
