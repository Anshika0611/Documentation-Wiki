import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Body = () => {
  const location = useLocation();
  const navigate = useNavigate();

 
  const params = new URLSearchParams(location.search);
  const query = params.get('query') || '';

  const [inputQuery, setInputQuery] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  setInputQuery(query);

  if (!query) {
    setResults([]);
    return;
  }

  const fetchResults = async () => {
    setLoading(true);

   
    const response = await fetch('/data.json');
    const allData = await response.json();

    
    const filtered = allData.filter(item =>
      item.keyword.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
    setLoading(false);
  };

  fetchResults();
}, [query]);


  const handleSearch = (e) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      
      navigate(`/search?query=${encodeURIComponent(inputQuery)}`);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Documentation Search</h1>

     
      <form onSubmit={handleSearch} className="flex justify-center mb-8">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Search documentation..."
          className="w-80 p-3 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-3 rounded-r hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      <h2 className="text-xl mb-4">Results for: <strong>{query}</strong></h2>

      {loading && <p className="text-gray-500">Loading...</p>}

      {!loading && results.length > 0 ? (
        <ul className="space-y-6">
          {results.map((item,index) => (
            <li key={index} className="border-b pb-4">
              <h3 className="text-blue-700 font-semibold text-lg">
                {item.title}
              </h3>
              <p className="text-gray-700 mt-1">{item.description}</p>

            </li>
          ))}
        </ul>
      ) : !loading ? (
        <p className="text-gray-500">No results found.</p>
      ) : null}
    </div>
  );
};

export default Body;
