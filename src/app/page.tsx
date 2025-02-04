"use client";

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Trash2, Edit, Check, Plus, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// TypeScript interface for Todo item
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  completedAt: string;
}

type FilterType = 'all' | 'active' | 'completed';

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('http://localhost:3001/todos');
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo = {
      title: newTodo,
      completed: false,
      completedAt: new Date().toISOString()
    };

    const response = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    const data = await response.json();
    setTodos([...todos, data]);
    setNewTodo('');
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const response = await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    const updatedTodo = await response.json();
    setTodos(todos.map(t => t.id === id ? updatedTodo : t));
  };

  const deleteTodo = async (id: number) => {
    await fetch(`http://localhost:3001/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(t => t.id !== id));
  };

  const clearCompleted = async () => {
    const completedTodos = todos.filter(t => t.completed);
    await Promise.all(completedTodos.map(todo => 
      fetch(`http://localhost:3001/todos/${todo.id}`, { method: 'DELETE' })
    ));
    setTodos(todos.filter(t => !t.completed));
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
    // Update order in database if needed
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-500">Todo App</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg hover:bg-purple-500/20"
          >
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>

        <form onSubmit={addTodo} className="mb-6">
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

        <div className="flex gap-2 mb-4">
          {(['all', 'active', 'completed'] as FilterType[]).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg capitalize ${
                filter === filterType
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-purple-500/20'
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {filteredTodos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`flex items-center gap-3 p-4 rounded-lg ${
                          isDarkMode ? 'bg-gray-800' : 'bg-white'
                        } shadow-sm`}
                      >
                        <div {...provided.dragHandleProps}>
                          <GripVertical className="w-5 h-5 text-gray-500" />
                        </div>
                        <button
                          onClick={() => toggleTodo(todo.id)}
                          className={`p-1 rounded-full border ${
                            todo.completed
                              ? 'bg-purple-500 border-purple-500'
                              : 'border-gray-400 hover:border-purple-500'
                          }`}
                        >
                          {todo.completed && <Check className="w-4 h-4 text-white" />}
                        </button>
                        <span
                          className={`flex-1 ${
                            todo.completed ? 'line-through text-gray-500' : ''
                          }`}
                        >
                          {todo.title}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => window.location.href = `/todo/${todo.id}`}
                            className="p-2 text-gray-400 hover:text-purple-500 rounded-lg hover:bg-purple-500/20"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-500/20"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {todos.some(todo => todo.completed) && (
          <button
            onClick={clearCompleted}
            className="mt-4 px-4 py-2 text-sm text-gray-400 hover:text-purple-500"
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoApp;