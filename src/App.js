import React, { useState, useEffect } from "react";
import "./App.css";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import InsightsPanel from "./components/InsightsPanel";
import { FaPlus } from "react-icons/fa";

const backendUrl = "https://backend-1p5d.onrender.com/";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: "", priority: "", search: "" });
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${backendUrl}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(
    (t) =>
      (!filters.status || t.status === filters.status) &&
      (!filters.priority || t.priority === filters.priority) &&
      (!filters.search || t.title.toLowerCase().includes(filters.search.toLowerCase()))
  );

  const insights = (() => {
    const totalOpen = tasks.filter((t) => t.status !== "Done").length;
    const dueSoon = tasks.filter((t) => {
      const diff = (new Date(t.due_date) - new Date()) / (1000 * 60 * 60 * 24);
      return diff <= 3 && diff >= 0;
    }).length;
    const completed = tasks.filter((t) => t.status === "Done").length;

    const summary = tasks.length
      ? `Most are ${
          ["Low", "Medium", "High"].sort(
            (a, b) =>
              tasks.filter((t) => t.priority === b).length -
              tasks.filter((t) => t.priority === a).length
          )[0]
        } priority and due soon.`
      : "No tasks yet — start adding!";

    return { totalOpen, dueSoon, completed, summary };
  })();

  const handleAdd = () => {
    setEditTask(null);
    setShowForm(true);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Tracker</h1>
      </header>

      <div className="top-bar">
        <FilterBar filters={filters} setFilters={setFilters} />
        <button className="add-btn" onClick={handleAdd}>
          <FaPlus /> Add Task
        </button>
      </div>

      <TaskList
        tasks={filteredTasks}
        backendUrl={backendUrl}
        onEdit={(task) => {
          setEditTask(task);
          setShowForm(true);
        }}
        onUpdate={fetchTasks}
      />

      <InsightsPanel insights={insights} />

      {showForm && (
        <TaskForm
          backendUrl={backendUrl}
          onClose={() => setShowForm(false)}
          onSubmit={fetchTasks}
          editTask={editTask}
        />
      )}
    </div>
  );
};

export default App;
