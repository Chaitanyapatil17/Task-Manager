import { useState, useEffect } from "react";
import API from "../api/axios";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data);
      } catch (err) {
        setError("Could not load projects. Please refresh.");
      }
    };
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!title.trim() || !projectId) {
      return setError("Please provide a title and select a project.");
    }

    setLoading(true);
    setError("");

    try {
      await API.post("/tasks", {
        title,
        projectId,
        assignedTo: "", // Placeholder for logic to be added later
      });
      alert("Task created successfully");
      setTitle(""); // Clear input after success
      setProjectId(""); // Reset dropdown
    } catch (err) {
      setError("Failed to create task. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "450px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h2 style={{ borderBottom: "1px solid #eee", paddingBottom: "10px" }}>Create Task</h2>
      
      <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {error && <p style={{ color: "#d9534f", fontSize: "14px", margin: 0 }}>{error}</p>}

        <div>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Task Title</label>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Assign to Project</label>
          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "white" }}
          >
            <option value="">-- Choose a project --</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            backgroundColor: loading ? "#ccc" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold"
          }}
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}

export default CreateTask;