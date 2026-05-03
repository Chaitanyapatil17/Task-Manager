import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault(); // Prevents page reload
    if (!name.trim()) return setError("Project name is required");

    setLoading(true);
    setError("");

    try {
      await API.post("/projects", { name });
      navigate("/dashboard");
    } catch (err) {
  console.log(err.response?.data);
  alert(err.response?.data?.message || "Failed to create project");
} finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Create Project</h2>
      
      <form onSubmit={handleCreate}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box"
            }}
          />
          {error && <p style={{ color: "red", fontSize: "0.8rem", marginTop: "5px" }}>{error}</p>}
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: "8px 16px",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}

export default CreateProject;