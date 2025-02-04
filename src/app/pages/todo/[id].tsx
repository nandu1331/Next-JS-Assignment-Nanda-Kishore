// pages/todo/[id].tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Trash2, Check, ArrowLeft } from 'lucide-react';
import { Todo } from '../../types/todo';

export default function TodoDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState<Todo | null>(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    if (id) {
      fetchTodo();
    }
  }, [id]);

  const fetchTodo = async () => {
    const response = await fetch(`http://localhost:3001/todos/${id}`);
    const data = await response.json();
    setTodo(data);
    setEditTitle(data.title);
  };

  const updateTodo = async () => {
    if (!todo) return;
    
    const response = await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle }),
    });
    
    if (response.ok) {
      router.push('/');
    }
  };

  const toggleComplete = async () => {
    if (!todo) return;

    const completedAt = !todo.completed ? new Date().toISOString() : '';

    await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        completed: !todo.completed,
        completedAt 
      }),
    });
    
    fetchTodo();
  };

  const deleteTodo = async () => {
    await fetch(`http://localhost:3001/todos/${id}`, { method: 'DELETE' });
    router.push('/');
  };

  if (!todo) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-purple-500 hover:text-purple-400 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to todos
        </button>

        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleComplete}
              className={`p-2 rounded-full border ${
                todo.completed
                  ? 'bg-purple-500 border-purple-500'
                  : 'border-gray-400 hover:border-purple-500'
              }`}
            >
              {todo.completed && <Check className="w-5 h-5 text-white" />}
            </button>
            <h1 className="text-2xl font-bold flex-1">Todo Details</h1>
            <button
              onClick={deleteTodo}
              className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-500/20"
            >
              <Trash2 className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Todo Title
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Status
              </label>
              <div className="text-lg">
                {todo.completed ? (
                  <span className="text-green-500">Completed</span>
                ) : (
                  <span className="text-yellow-500">Active</span>
                )}
              </div>
            </div>

            {todo.completed && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Completed At
                </label>
                <div className="text-gray-300">
                  {new Date(todo.completedAt).toLocaleString()}
                </div>
              </div>
            )}

            <button
              onClick={updateTodo}
              className="w-full p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

                  