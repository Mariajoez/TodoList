export default function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <div className="flex items-center justify-between mb-2 border p-2 rounded">
      <span className={todo.is_complete ? 'line-through text-gray-500' : ''}>
        {todo.content}
      </span>
      <div className="flex gap-2">
        <button
          className="text-green-600"
          onClick={() => onToggle(todo.id, !todo.is_complete)}
        >
          {todo.is_complete ? 'Undo' : 'Done'}
        </button>
        <button
          className="text-red-600"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
