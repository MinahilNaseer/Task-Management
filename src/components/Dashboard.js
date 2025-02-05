import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTask, updateTask, deleteTask } from "../reducers/tasksSlice";

import "./LandingPage.css";
import "./Dashboard.css";

function Dashboard() {
  const tasks = useSelector((state) => state.tasks.items);
  const dispatch = useDispatch();

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayType, setOverlayType] = useState(""); // 'add' or 'update'
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("");

  const handleAddTask = () => {
    setOverlayType("add");
    setTaskName("");
    setTaskStatus("");
    setIsOverlayOpen(true);
  };

  const handleUpdateTask = (task) => {
    setOverlayType("update");
    setTaskToEdit(task);
    setTaskName(task.name);
    setTaskStatus(task.status);
    setIsOverlayOpen(true);
  };

  const handleSaveTask = () => {
    if (overlayType === "add") {
      const newTask = {
        id: tasks.length + 1, // Simple unique ID generation
        name: taskName,
        status: taskStatus,
      };
      dispatch(addTask(newTask));
    } else if (overlayType === "update") {
      const updatedTask = {
        ...taskToEdit,
        name: taskName,
        status: taskStatus,
      };
      dispatch(updateTask(updatedTask));
    }
    setIsOverlayOpen(false);
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Taakie</h2>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li>Tasks</li>
            <li>Review & Statistics</li>
            <li>Documents</li>
            <li>Settings</li>
          </ul>
        </nav>
        <button onClick={handleAddTask} className="cta-button">Add Task</button>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome Back!</h1>
          <p>Your tasks overview at a glance.</p>
        </header>
        <div className="task-overview">
          <div className="task-card red">{tasks.filter(task => task.status === 'Completed').length} Completed Tasks</div>
          <div className="task-card orange">{tasks.filter(task => task.status === 'Open').length} Open Tasks</div>
          <div className="task-card green">{tasks.filter(task => task.status === 'Ongoing').length} Ongoing Tasks</div>
        </div>
        <section className="tasks">
          <h2>Tasks Overview</h2>
          <div className="tasks-list">
            <ul>
              {tasks.map((task) => (
                <li key={task.id} className="task-item">
                  {task.name} | Status: {task.status}
                  <div className="task-buttons">
                    <button onClick={() => handleUpdateTask(task)} className="update-button">Update</button>
                    <button onClick={() => dispatch(deleteTask(task.id))} className="delete-button">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {isOverlayOpen && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>{overlayType === "add" ? "Add Task" : "Update Task"}</h2>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Task Name"
              className="input-field"
            />
            <input
              type="text"
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
              placeholder="Task Status (Completed, Open, Ongoing)"
              className="input-field"
            />
            <button onClick={handleSaveTask} className="cta-button">
              Save
            </button>
            <button onClick={() => setIsOverlayOpen(false)} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
