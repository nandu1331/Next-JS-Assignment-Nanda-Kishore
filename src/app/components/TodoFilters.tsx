// components/TodoFilters.tsx
import React from 'react';
import { FilterType } from '../types/todo';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="flex gap-2 mb-4">
      {(['all', 'active', 'completed'] as FilterType[]).map((filterType) => (
        <button
          key={filterType}
          onClick={() => onFilterChange(filterType)}
          className={`px-4 py-2 rounded-lg capitalize ${
            currentFilter === filterType
              ? 'bg-purple-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-purple-500/20'
          }`}
        >
          {filterType}
        </button>
      ))}
    </div>
  );
};

export default TodoFilters;