// types/todo.ts
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  completedAt: string;
  createdAt: string;
}

export type FilterType = 'all' | 'active' | 'completed';