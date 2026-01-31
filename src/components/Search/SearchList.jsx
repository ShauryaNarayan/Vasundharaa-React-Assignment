// src/components/Search/SearchList.jsx
import React, { useState } from 'react';

const SearchList = () => {
  const frameworks = [
    "React", "Angular", "Vue", "Svelte", "Next.js", "Nuxt", 
    "Remix", "Gatsby", "Astro", "TypeScript", "JavaScript", 
    "Python", "Java", "C++", "Rust", "Go", "Tailwind CSS",
    "Bootstrap", "Material UI", "Chakra UI"
  ];

  const [searchTerm, setSearchTerm] = useState('');

  // The Logic: Split text by the search term and highlight matches
  const getHighlightedText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => (
          part.toLowerCase() === highlight.toLowerCase() 
            ? <span key={i} className="bg-yellow-200 font-bold text-blue-800 px-1 rounded">{part}</span> 
            : part
        ))}
      </span>
    );
  };

  const filteredList = frameworks.filter(item => 
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Live Search</h2>
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search frameworks..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm mb-4"
      />
      <div className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">
        Found {filteredList.length} results
      </div>
      <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {filteredList.map((item, index) => (
          <li key={index} className="p-3 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-100 text-gray-700">
            {getHighlightedText(item, searchTerm)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;