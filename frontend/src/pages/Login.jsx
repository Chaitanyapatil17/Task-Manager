import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Allows the "Enter" key to submit the form
    
    if (!formData.email || !formData.password) {
      return setError("Please fill in all fields.");
    }

    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleLogin} style={formStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Login</h2>
        
        {error && <p style={errorStyle}>{error}</p>}

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Password</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          style={{
            ...buttonStyle,
            backgroundColor: loading ? "#ccc" : "#333"
          }}
        >
          {loading ? "Authenticating..." : "Login"}
        </button>

        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "14px" }}>
          Don't have an account? <Link to="/register" style={{ color: "#007bff" }}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

// Simple internal styles to keep it clean and centered
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
  fontFamily: "sans-serif"
};

const formStyle = {
  width: "100%",
  maxWidth: "360px",
  padding: "2rem",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
};

const inputGroupStyle = { marginBottom: "1rem" };
const labelStyle = { display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "600" };
const inputStyle = { width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" };
const errorStyle = { color: "#721c24", backgroundColor: "#f8d7da", padding: "10px", borderRadius: "4px", fontSize: "14px", marginBottom: "1rem" };
const buttonStyle = { width: "100%", padding: "10px", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" };

export default Login;