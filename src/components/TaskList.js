import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TaskList = ({ tasks, backendUrl, onEdit, onUpdate }) => {
  const handleDelete = async (id) => {
    await fetch(`${backendUrl}/tasks/${id}`, { method: "DELETE" });
    onUpdate();
  };

  return (
    <div className="task-grid">
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-card">
            <div className="task-header">
              <h3>{task.title}</h3>
              <div className="icons">
                <button className="icon-btn">
                  <FaEdit
                    className="edit-icon"
                    onClick={() => onEdit(task)}
                    title="Edit"
                  />
                </button>
                <button className="icon-btn">
                  <FaTrash
                    className="delete-icon"
                    onClick={() => handleDelete(task.id)}
                    title="Delete"
                  />
                </button>
              </div>
            </div>

            <p className="task-desc">{task.description}</p>
            <p className="due-date">Due: {task.due_date}</p>

            <div className="task-meta">
              <span className={`status ${task.status}`}>{task.status}</span>
              <span className={`priority ${task.priority}`}>{task.priority}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
