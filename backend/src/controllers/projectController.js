import Project from "../models/Project.js";

// 🔹 Create Project
export const createProject = async (req, res) => {
  try {
    const { name } = req.body;

    const project = await Project.create({
      name,
      createdBy: req.user.id,
      members: [req.user.id],
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get Projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id,
    }).populate("members", "name email");

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Add Member
export const addMember = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.members.includes(userId)) {
      return res.status(400).json({ message: "User already a member" });
    }

    project.members.push(userId);
    await project.save();

    res.json({
      message: "Member added successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};