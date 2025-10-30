import React, { useState, useEffect } from "react";

const TaskForm = ({ backendUrl, onClose, onSubmit, editTask }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    due_date: "",
    status: "Open",
  });

  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title || "",
        description: editTask.description || "",
        priority: editTask.priority || "Medium",
        due_date: editTask.due_date ? editTask.due_date.slice(0, 10) : "",
        status: editTask.status || "Open",
      });
    }
  }, [editTask]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare clean data (avoid sending id or unwanted fields)
    const taskData = {
      title: form.title,
      description: form.description,
      priority: form.priority,
      due_date: form.due_date,
      status: form.status,
    };

    const url = editTask
      ? `${backendUrl}/tasks/${editTask.id}`
      : `${backendUrl}/tasks`;
    const method = editTask ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (!res.ok) throw new Error("Failed to save task");

      await onSubmit(); // Refresh tasks
      onClose(); // Close modal
    } catch (err) {
      console.error("Error:", err);
      alert("Error saving task. Please check your backend log.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{editTask ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit} className="task-form">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <input
            type="date"
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
            required
          />

          <select name="status" value={form.status} onChange={handleChange}>
            <option>Open</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <select name="priority" value={form.priority} onChange={handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <div className="modal-actions">
            <button type="submit" className="save-btn">
              {editTask ? "Update" : "Add"}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
