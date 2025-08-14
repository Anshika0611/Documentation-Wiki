import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      <form onSubmit={handleSearch} className="flex justify-center">
        <input
          type="text"
          value={query}
          placeholder="Search Wikipedia..."
          onChange={(e) => setQuery(e.target.value)}
          className="w-80 p-3 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-red-600 text-white mx-2 px-5 py-3 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Home;
