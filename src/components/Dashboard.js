import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchTasks,
    addTaskAPI,
    updateTaskAPI,
    deleteTaskAPI,
} from "../reducers/tasksSlice";
import "./Dashboard.css";

function Dashboard() {
    const tasks = useSelector((state) => state.tasks.items);
    const loading = useSelector((state) => state.tasks.loading);
    const error = useSelector((state) => state.tasks.error);

    const dispatch = useDispatch();

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [overlayType, setOverlayType] = useState(""); 
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskCompleted, setTaskCompleted] = useState(false);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const displayedTasks = tasks.slice(0, 5); 

    const handleAddTask = () => {
        setOverlayType("add");
        setTaskTitle("");
        setTaskCompleted(false);
        setIsOverlayOpen(true);
    };

    const handleUpdateTask = (task) => {
        setOverlayType("update");
        setTaskToEdit(task);
        setTaskTitle(task.title);
        setTaskCompleted(task.completed);
        setIsOverlayOpen(true);
    };

    const handleSaveTask = () => {
        if (overlayType === "add") {
            const newTask = {
                title: taskTitle,
                completed: taskCompleted,
            };
            dispatch(addTaskAPI(newTask));
        } else if (overlayType === "update") {
            const updatedTask = {
                ...taskToEdit,
                title: taskTitle,
                completed: taskCompleted,
            };
            dispatch(updateTaskAPI(updatedTask));
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

                {loading && <p>Loading tasks...</p>}
                {error && <p>Error: {error}</p>}

                <div className="task-overview">
                    <div className="task-card red">
                        {displayedTasks.filter((task) => task.completed).length} Completed Tasks
                    </div>
                    <div className="task-card orange">
                        {displayedTasks.filter((task) => !task.completed).length} Pending Tasks
                    </div>
                </div>


                <section className="tasks">
                    <h2>Tasks Overview</h2>
                    <div className="tasks-list">
                        <ul>
                            {displayedTasks.map((task) => (
                                <li key={task.id} className="task-item">
                                    {task.title} | Status: {task.completed ? "Completed" : "Pending"}
                                    <div className="task-buttons">
                                        <button
                                            onClick={() => handleUpdateTask(task)}
                                            className="update-button"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => dispatch(deleteTaskAPI(task.id))}
                                            className="delete-button"
                                        >
                                            Delete
                                        </button>
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
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            placeholder="Task Title"
                            className="input-field"
                        />
                        <label>
                            <input
                                type="checkbox"
                                checked={taskCompleted}
                                onChange={(e) => setTaskCompleted(e.target.checked)}
                            />
                            Completed
                        </label>
                        <button onClick={handleSaveTask} className="cta-button">Save</button>
                        <button onClick={() => setIsOverlayOpen(false)} className="cancel-button">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
