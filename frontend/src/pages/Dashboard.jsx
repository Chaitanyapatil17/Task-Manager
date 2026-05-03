import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const projRes = await API.get("/projects");
      setProjects(projRes.data);

      const dashRes = await API.get("/dashboard");
      setStats(dashRes.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>Task Stats</h3>
      <p>Total: {stats.total}</p>
      <p>Completed: {stats.completed}</p>
      <p>Pending: {stats.pending}</p>
      <p>Overdue: {stats.overdue}</p>

      <br />

      <Link to="/create-project">Create Project</Link>
      <br />
      <Link to="/create-task">Create Task</Link>

      <h3>Projects:</h3>
      {projects.map((p) => (
        <div key={p._id}>{p.name}</div>
      ))}
    </div>
  );
}

export default Dashboard;