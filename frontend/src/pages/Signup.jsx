import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  // Consolidating state into one object for cleaner code
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Basic Client-side Validation
    if (!formData.name || !formData.email || !formData.password) {
      return setError("All fields are required.");
    }
    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setLoading(true);
    setError("");

    try {
      await API.post("/auth/register", {
        ...formData,
        role: "member",
      });

      // No need for alert if you redirect to a success page or login
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSignup} style={formStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Create Account</h2>
        
        {error && <p style={errorStyle}>{error}</p>}

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Full Name</label>
          <input
            name="name"
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Min. 6 characters"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{
            ...buttonStyle,
            backgroundColor: loading ? "#ccc" : "#28a745" // Green for "success/create" actions
          }}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p style={{ textAlign: "center", marginTop: "1.2rem", fontSize: "14px" }}>
          Already have an account? <Link to="/" style={{ color: "#007bff", textDecoration: "none" }}>Login</Link>
        </p>
      </form>
    </div>
  );
}

// Styling (consistent with the Login enhancement)
const containerStyle = { display: "flex", justifyContent: "center", alignItems: "center", height: "90vh", fontFamily: "sans-serif" };
const formStyle = { width: "100%", maxWidth: "400px", padding: "2rem", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" };
const inputGroupStyle = { marginBottom: "1rem" };
const labelStyle = { display: "block", marginBottom: "5px", fontSize: "14px", fontWeight: "600" };
const inputStyle = { width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" };
const errorStyle = { color: "#721c24", backgroundColor: "#f8d7da", padding: "10px", borderRadius: "4px", fontSize: "13px", marginBottom: "1rem", textAlign: "center" };
const buttonStyle = { width: "100%", padding: "12px", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" };

export default Signup;