import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";

const FilterBar = ({ filters, setFilters }) => {
  const [localSearch, setLocalSearch] = useState(filters.search || "");

  const updateFilter = useCallback(
    (newFilters) => setFilters((prev) => ({ ...prev, ...newFilters })),
    [setFilters]
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      if (localSearch.trim() !== filters.search) {
        updateFilter({ search: localSearch.trim() });
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [localSearch, filters.search, updateFilter]);

  const handleClear = () => {
    setLocalSearch("");
    setFilters({ status: "", priority: "", search: "" });
  };

  return (
    <div className="filter-bar">
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by title..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>

      <select
        name="status"
        value={filters.status}
        onChange={(e) => updateFilter({ status: e.target.value })}
      >
        <option value="">All Status</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <select
        name="priority"
        value={filters.priority}
        onChange={(e) => updateFilter({ priority: e.target.value })}
      >
        <option value="">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button onClick={handleClear} className="clear-btn">
        Clear
      </button>
    </div>
  );
};

export default FilterBar;
