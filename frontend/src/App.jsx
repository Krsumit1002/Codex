import { useState, useEffect } from "react";

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!code.trim()) {
      alert("Please enter some code!");
      return;
    }
    setLoading(true);
    setReview("");

    try {
      const res = await fetch("http://localhost:3000/api/ai/get-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setReview(data.review || "No review returned.");
    } catch (error) {
      setReview("❌ Error fetching review. Check console & server.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (review) {
      const box = document.getElementById("reviewBox");
      box.style.opacity = 0;
      box.style.transform = "translateY(20px)";
      setTimeout(() => {
        box.style.transition = "all 0.5s ease";
        box.style.opacity = 1;
        box.style.transform = "translateY(0)";
      }, 50);
    }
  }, [review]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#1e1e2f",
        color: "#f5f5f5",
        fontFamily: "sans-serif",
      }}
    >
      {/* App Title */}
      <h1
        style={{
          fontSize: "3.5rem",
          fontWeight: "900",
          marginBottom: "2rem",
          color: "#00f6ff",
          textShadow: "0 0 10px rgba(0,246,255,0.7)",
        }}
      >
        Codex
      </h1>

      {/* Code Input */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Hey ! How can i help you ?"
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "20rem",
          padding: "1rem",
          borderRadius: "1rem",
          border: "2px solid #333",
          fontFamily:"sans-serif",
          fontSize: "1.1rem",
          backgroundColor: "#2e2e3f",
          color: "#f5f5f5",
          outline: "none",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          marginBottom: "1.5rem",
        }}
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: "0.8rem 2rem",
          borderRadius: "1rem",
          fontWeight: "700",
          fontSize: "1rem",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 5px 20px rgba(0,246,255,0.5)",
          transition: "all 0.3s ease",
          marginBottom: "2rem",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {loading ? "Reviewing..." : "Get Review"}
      </button>

      {/* AI Review Box */}
      {review && (
        <div
          id="reviewBox"
          style={{
            width: "100%",
            maxWidth: "900px",
            padding: "1.5rem",
            fontFamily:"monospace",
            borderRadius: "1.5rem",
            backgroundColor: "#2e2e3f",
            border: "1px solid #444",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              marginBottom: "1rem",
              color: "#00f6ff",
            }}
          >
            My Review:
          </h2>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              padding: "1rem",
              borderRadius: "1rem",
              backgroundColor: "#1e1e2f",
              color: "#f5f5f5",
              border: "1px solid #333",
              boxShadow: "inset 0 5px 15px rgba(0,0,0,0.3)",
            }}
          >
            {review}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
