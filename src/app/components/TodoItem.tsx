// components/TodoItem.tsx
"use client";  // Add this at the top of pages/todo/[id].tsx

import React from 'react';
import { Todo } from '../types/todo';
import { Check, Edit, Trash2, GripVertical } from 'lucide-react';
import { useRouter } from 'next/router';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  dragHandleProps: any;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, dragHandleProps }) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-800 shadow-sm">
      <div {...dragHandleProps}>
        <GripVertical className="w-5 h-5 text-gray-500" />
      </div>
      <button
        onClick={() => onToggle(todo.id)}
        className={`p-1 rounded-full border ${
          todo.completed
            ? 'bg-purple-500 border-purple-500'
            : 'border-gray-400 hover:border-purple-500'
        }`}
      >
        {todo.completed && <Check className="w-4 h-4 text-white" />}
      </button>
      <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
        {todo.title}
      </span>
      {todo.completed && (
        <span className="text-sm text-gray-500">
          Completed: {new Date(todo.completedAt).toLocaleDateString()}
        </span>
      )}
      <div className="flex gap-2">
        <button
          onClick={() => router.push(`/todo/${todo.id}`)}
          className="p-2 text-gray-400 hover:text-purple-500 rounded-lg hover:bg-purple-500/20"
        >
          <Edit className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-500/20"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;