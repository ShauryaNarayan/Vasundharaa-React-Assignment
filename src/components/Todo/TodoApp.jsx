// src/components/Todo/TodoApp.jsx
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import FilterControls from './FilterControls';

const TodoApp = () => {
  // 1. Load tasks from LocalStorage immediately (or start empty)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('my_todo_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');

  // 2. Save to LocalStorage whenever 'tasks' changes
  useEffect(() => {
    localStorage.setItem('my_todo_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return; // Don't add empty tasks
    
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    setText(''); // Clear input
  };

  // Toggle completion status
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filter logic: Decide what to show
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Task Manager</h2>
      
      {/* Input Form */}
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      {/* Filter Buttons */}
      <FilterControls filter={filter} setFilter={setFilter} />

      {/* Task List */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-400 italic mt-4">No tasks found</p>
        ) : (
          filteredTasks.map(task => (
            <TodoItem 
              key={task.id} 
              task={task} 
              toggleComplete={toggleComplete} 
              deleteTask={deleteTask} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoApp;