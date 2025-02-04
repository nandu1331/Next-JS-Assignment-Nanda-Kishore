// pages/index.tsx
import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Todo, FilterType } from '../types/todo';
import TodoInput from '../components/TodoInput';
import TodoFilters from '../components/TodoFilters';
import TodoList from '../components/TodoList';

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
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

  const addTodo = async (title: string) => {
    const todo = {
      title,
      completed: false,
      completedAt: '',
    };

    const response = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    const data = await response.json();
    setTodos([...todos, data]);
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const completedAt = !todo.completed ? new Date().toISOString() : '';

    const response = await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        completed: !todo.completed,
        completedAt 
      }),
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

        <TodoInput onAdd={addTodo} isDarkMode={isDarkMode} />
        <TodoFilters currentFilter={filter} onFilterChange={setFilter} />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onDragEnd={handleDragEnd}
        />

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