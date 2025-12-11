import React, { useState } from "react";
import axios from "axios";
import { WordCloud3D } from "./components/WordCloud3D";
import type { WordDatum } from "./components/WordCloud3D";

const SAMPLE_URLS = [
  "https://www.bbc.com/news/world-us-canada-68055041",
  "https://www.nytimes.com/",
  "https://edition.cnn.com/",
];

type AnalyzeResponse = {
  words: WordDatum[];
};

function App() {
  const [url, setUrl] = useState<string>(SAMPLE_URLS[0]);
  const [words, setWords] = useState<WordDatum[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<AnalyzeResponse>(
        "http://127.0.0.1:8000/analyze",
        { url }
      );
      if (response.data && Array.isArray(response.data.words)) {
        setWords(response.data.words);
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to analyze article. Please try another URL.");
    } finally {
      setLoading(false);
    }
  };

  const handleSampleClick = (sample: string) => {
    setUrl(sample);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        background: "radial-gradient(circle at top, #1f2933, #020617)",
        color: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Top control panel */}
      <header
        style={{
          padding: "1rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          zIndex: 10,
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>
          3D News Topic Word Cloud
        </h1>
        <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8 }}>
          Enter a news article URL or pick one of the samples, then click{" "}
          <strong>Analyze</strong> to see the main topics as a 3D word cloud.
        </p>

        <form
          onSubmit={handleAnalyze}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter article URL"
            required
            style={{
              flex: "0 1 650px", // fixed reasonable width
              padding: "0.35rem 0.6rem", // smaller padding
              fontSize: "0.85rem", // slightly smaller text
              borderRadius: "0.4rem",
              border: "1px solid rgba(148,163,184,0.6)",
              background: "rgba(15,23,42,0.85)",
              color: "white",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "none",
              background:
                "linear-gradient(135deg, rgb(129, 230, 217), rgb(56, 189, 248))",
              color: "#020617",
              fontWeight: 600,
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </form>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.8rem", opacity: 0.8 }}>
            Sample links:
          </span>
          {SAMPLE_URLS.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => handleSampleClick(sample)}
              style={{
                fontSize: "0.75rem",
                padding: "0.25rem 0.6rem",
                borderRadius: "999px",
                border: "1px solid rgba(148,163,184,0.8)",
                background: "rgba(15,23,42,0.7)",
                color: "white",
                cursor: "pointer",
              }}
            >
              {new URL(sample).hostname}
            </button>
          ))}
        </div>

        {error && (
          <div
            style={{
              marginTop: "0.25rem",
              padding: "0.4rem 0.6rem",
              borderRadius: "0.4rem",
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(248,113,113,0.6)",
              fontSize: "0.8rem",
            }}
          >
            {error}
          </div>
        )}
      </header>

      {/* 3D word cloud area */}
      <main
        style={{
          flex: "1 1 auto",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {loading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 5,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                padding: "0.75rem 1.25rem",
                borderRadius: "999px",
                background: "rgba(15,23,42,0.9)",
                border: "1px solid rgba(148,163,184,0.7)",
                fontSize: "0.9rem",
              }}
            >
              Analyzing article and building word cloud…
            </div>
          </div>
        )}

        {words.length > 0 ? (
          <WordCloud3D words={words} />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.95rem",
              opacity: 0.7,
              textAlign: "center",
              padding: "0 1rem",
            }}
          >
            Enter a news article URL above and click{" "}
            <strong style={{ marginLeft: "0.25rem" }}>Analyze</strong> to see
            the 3D word cloud.
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
