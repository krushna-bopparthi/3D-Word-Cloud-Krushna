# 🌐 3D Word Cloud – Krushna Bopparthi

An interactive full-stack application that extracts topics from any news article using **FastAPI (Python)** and visualizes them as a **3D animated word cloud** using **React Three Fiber (Three.js for React)**.

This project showcases:
- Modern React + TypeScript development  
- Lightweight NLP keyword extraction (TF-IDF)  
- 3D rendering & animation  
- Clean API integration  

---

## 🚀 Features

### 🔹 **Backend (FastAPI)**
- Fetches article text from a provided URL  
- Cleans & preprocesses text  
- Extracts keywords using **TF-IDF**  
- Returns `{ word, weight }` list as JSON  
- Includes CORS handling  
- Interactive API docs available at:  
  👉 `http://127.0.0.1:8000/docs`

---

### 🔹 **Frontend (React + TypeScript + Three.js)**
- URL input box + sample article buttons  
- Calls backend API  
- Renders a **3D floating word cloud**  
- Words sized proportionally to weight  
- Smooth breathing-style animation  
- Pastel color palette on star-field 3D background  
- Minimal, clean UI  

---

## 📂 Project Structure
- 3D-Word-Cloud-Krushna/
- ├── backend/
- │   ├── app.py
- │   ├── utils.py
- │   ├── requirements.txt
- │   └── ...
- │
- ├── frontend/
- │   ├── src/
- │   │   ├── App.tsx
- │   │   ├── WordCloud3D.tsx
- │   │   └── ...
- │   ├── package.json
- │   └── ...
- │
- ├── setup.ps1          # One-command setup and run script
- └── README.md



---

## 🛠 Requirements

Make sure you have installed:

- **Python 3.1+**
- **Node.js 18+**
- **PowerShell (Windows)**  

> If using Mac/Linux, ask for a `setup.sh` version.

---

# ▶️ Run the Project (One Command)

- From the **project root**, run (in Powershell):
```
./setup.ps1
```
# This script will automatically:

Create a Python virtual environment
- Install backend dependencies
- Install frontend dependencies
- Start the FastAPI backend
- Start the React frontend

🔗 App URLs

- Backend (FastAPI): http://127.0.0.1:8000
- Frontend (React): The terminal will show the exact Vite URL (commonly http://localhost:5173)

# API Usage
#POST/Analyze

Request:
```
{ "url": "https://example.com/news-article" }
```
Response:Json
```

{
  "words": [
    { "word": "technology", "weight": 0.62 },
    { "word": "ai", "weight": 0.41 }
  ]
}
```


📦 Libraries Used
# Backend
- fastapi
- uvicorn
- BeautifulSoup4
- requests
- scikit-learn
- numpy

# Frontend

- React
- TypeScript
- Vite
- @react-three/fiber
- @react-three/drei
- Three.js

