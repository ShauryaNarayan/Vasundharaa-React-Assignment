// src/components/Todo/TodoItem.jsx
import React from 'react';

const TodoItem = ({ task, toggleComplete, deleteTask }) => {
return (
    <div className={`flex justify-between items-center p-3 mb-2 rounded shadow-sm ${task.completed ? 'bg-green-100' : 'bg-white'}`}>
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleComplete(task.id)}>
        {/* Checkbox Appearance */}
        <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${task.completed ? 'border-green-600 bg-green-600' : 'border-gray-400'}`}>
        {task.completed && <span className="text-white text-xs">✓</span>}
        </div>

        {/* Task Text with Strikethrough if completed */}
        <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
        {task.text}
        </span>
    </div>

    <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500 hover:text-red-700 font-bold px-2"
    >
        ✕
    </button>
    </div>
);
};

export default TodoItem;