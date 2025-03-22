import React from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <div className="App">
      <h1>Task Management System</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
