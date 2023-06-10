import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform search based on the query
    console.log('Searching for:', query);
  };

  return (
    <form onSubmit={handleSearch} className="flex">
      <div className="flex items-center rounded-l-md border-t border-b border-l text-gray-800 border-gray-200 bg-white">
        <span className="px-4 py-2">
          <AiOutlineSearch />
        </span>
        <input
          type="text"
          name="searchQuery"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 border-none bg-transparent focus:outline-none"
        />
      </div>
    </form>
  );
};

export default SearchBar;
