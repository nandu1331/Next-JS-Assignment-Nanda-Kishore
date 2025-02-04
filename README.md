# Next.js Todo Application

A modern, feature-rich todo application built with Next.js, TypeScript, and Tailwind CSS. This application provides a clean and intuitive interface for managing your daily tasks with advanced features like drag-and-drop reordering and dark mode support.

## Features

- ✨ Create, read, update, and delete todos
- ✅ Mark todos as complete
- 🏷️ Filter todos by status (all/active/completed)
- 🌓 Toggle between light and dark mode
- 📱 Fully responsive design
- 🎯 View detailed todo information
- ↕️ Drag and drop to reorder tasks
- 🕒 Track creation and completion dates
- 🔄 Real-time updates with JSON Server

## Tech Stack

- Next.js 13+
- TypeScript
- Tailwind CSS
- JSON Server (for backend)
- Lucide React (for icons)
- @hello-pangea/dnd (for drag and drop)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone [your-repo-url]
cd [your-repo-name]
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `db.json` file in the root directory:

```json
{
  "todos": []
}
```

## Running the Application

1. Start the JSON Server (in one terminal):

```bash
npm run json-server
# or
yarn json-server
```

2. Start the development server (in another terminal):

```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── components/
│   ├── TodoInput.tsx
│   ├── TodoFilters.tsx
│   ├── TodoItem.tsx
│   └── TodoList.tsx
├── pages/
│   ├── index.tsx
│   └── todos/
│       └── [id].tsx
├── types/
│   └── todo.ts
├── styles/
│   └── globals.css
└── public/
```

## Todo Interface

```typescript
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  completedAt: string;
  createdAt: string;
}
```

## API Endpoints

The JSON Server provides the following endpoints:

- `GET /todos` - Get all todos
- `GET /todos/:id` - Get a specific todo
- `POST /todos` - Create a new todo
- `PATCH /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## Features in Detail

### Task Management

- Add new tasks with automatic creation timestamp
- Mark tasks as complete/incomplete
- Delete tasks
- Edit task details in a dedicated page
- View task creation and completion dates

### Filtering

- View all tasks
- Filter active tasks
- Filter completed tasks

### User Interface

- Dark/Light mode toggle
- Responsive design for all screen sizes
- Drag and drop reordering of tasks
- Hover states for interactive elements
- Loading states and error handling

### Task Details Page

- View detailed information about each task
- Edit task title
- Toggle completion status
- Delete task
- View creation and completion timestamps

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [JSON Server](https://github.com/typicode/json-server)
- [Lucide Icons](https://lucide.dev/)
