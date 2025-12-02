import { useState } from 'react';
import './UserManagement.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          className="search-input"
        />
        <button
          type="submit"
          className="btn btn-primary"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
