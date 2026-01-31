// src/components/Progress/MultiProgressBar.jsx
import React, { useState } from 'react';

const MultiProgressBar = () => {
  // 1. State: An array to hold values for 3 distinct bars
  const [values, setValues] = useState([40, 60, 20]);

  // 2. Helper to update a specific bar's value
  const handleInputChange = (index, newValue) => {
    const newValues = [...values];
    newValues[index] = Number(newValue);
    setValues(newValues);
  };

  // 3. Derived State: Calculate the total percentage (Average)
  // Logic: Sum of all values / Number of values
  const totalValue = values.reduce((acc, curr) => acc + curr, 0);
  const average = Math.round(totalValue / values.length);

  // 4. Dynamic Color Logic
  // If average is less than 40, use Red. Otherwise, Green.
  const barColor = average < 40 ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Dynamic Progress</h2>

      {/* THE MAIN BAR (Summary) */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-bold text-gray-600 mb-1">
          <span>Overall Progress</span>
          <span>{average}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${barColor}`} 
            style={{ width: `${average}%` }}
          ></div>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* INDIVIDUAL INPUTS */}
      <div className="space-y-4">
        {values.map((val, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Section {index + 1}</span>
              <span>{val}%</span>
            </div>
            
            <div className="flex items-center gap-3">
              {/* The Range Slider */}
              <input
                type="range"
                min="0"
                max="100"
                value={val}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiProgressBar;