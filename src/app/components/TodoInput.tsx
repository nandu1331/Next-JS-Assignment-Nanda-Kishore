// components/TodoInput.tsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAdd: (title: string) => Promise<void>;
  isDarkMode: boolean;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAdd, isDarkMode }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    await onAdd(newTodo);
    setNewTodo('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className={`flex-1 p-3 rounded-lg ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border focus:outline-none focus:border-purple-500`}
        />
        <button
          type="submit"
          className="p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
};

export default TodoInput;