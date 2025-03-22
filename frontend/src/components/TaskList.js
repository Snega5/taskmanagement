import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get('http://127.0.0.1:5000/tasks');
    setTasks(res.data);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/tasks/${id}`);
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await axios.put(`http://127.0.0.1:5000/tasks/${task.id}`, {
      ...task,
      completed: !task.completed,
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </h3>
          <p>{task.description}</p>
          <button onClick={() => toggleComplete(task)}>
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
