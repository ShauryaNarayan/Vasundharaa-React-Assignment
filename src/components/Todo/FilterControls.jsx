// src/components/Todo/FilterControls.jsx
import React from 'react';

const FilterControls = ({ filter, setFilter }) => {
  // Helper to make class names cleaner
  const btnClass = (status) => 
    `px-4 py-1 rounded-full text-sm font-medium transition-colors ${
      filter === status 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
    }`;

  return (
    <div className="flex justify-center gap-2 my-4">
      <button onClick={() => setFilter('all')} className={btnClass('all')}>All</button>
      <button onClick={() => setFilter('active')} className={btnClass('active')}>Active</button>
      <button onClick={() => setFilter('completed')} className={btnClass('completed')}>Completed</button>
    </div>
  );
};

export default FilterControls;