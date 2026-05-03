import Task from "../models/Task.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const total = await Task.countDocuments({ assignedTo: userId });

    const completed = await Task.countDocuments({
      assignedTo: userId,
      status: "completed",
    });

    const pending = await Task.countDocuments({
      assignedTo: userId,
      status: "pending",
    });

    const overdue = await Task.countDocuments({
      assignedTo: userId,
      status: "pending",
      dueDate: { $lt: new Date() },
    });

    res.json({ total, completed, pending, overdue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};