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
- │    ├── app.py
- │    ├── utils.py
- │    ├── requirements.txt
- │    └── ...
- │
- ├── frontend/
- │    ├── src/
- │    │   ├── App.tsx
- │    │   ├── WordCloud3D.tsx
- │    │   └── ...
- │    ├── package.json
- │    └── ...
- │
- ├── setup.ps1          # One-command setup and run script
- └── README.md



---

## 🛠 Requirements

Make sure you have installed:

- **Python 3.1+**
- **Node.js 18+**
- **PowerShell (Windows)**
- **bash(Linux)**

> If using Mac/Linux, ask for a `setup.sh` version.

---

# ▶️ Run the Project (One Command)
# For Windows
- From the **project root**, run (in Powershell - Run as Admin):
```
./setup.ps1
```
# For MacOS/Linux
- From the **project root**, run (in bash):
```
./setup.sh
```
- If permission error occurs
```
chmod +x setup.sh
./setup.sh
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

# How it works
**1. User enters a news article URL.**
- The frontend sends the URL to the FastAPI backend.

**2. Backend fetches & processes the article**
- Downloads the webpage
- Removes HTML tags, punctuation, and noise
- Extracts the main text
- Applies TF-IDF keyword extraction
- Returns a ranked list of important words with weights.

**3. 3D Word Cloud renders the results**
- Converts each word into a 3D object
- Sizes the word based on weight
- Assigns color dynamically
- Gently animates each word (floating motion)
- Ensures spacing to reduce overlapping

**4. User sees an interactive 3D visualization**
- Smooth motion
- Hover scale animation
- Galaxy-style star background
- Fully navigable 3D space

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

