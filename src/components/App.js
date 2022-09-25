import { useState } from 'react';
import { initialTodos, getVisibleTodos } from '../data/todos.js';

import './App.css'
import NewTodo from './NewTodo';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const visibleTodos = getVisibleTodos(todos, showActive);

  return (
    <div className='app-base'>
      <div>
        <NewTodo onAdd={newTodo => setTodos([...todos, newTodo])} />
      </div>

      <div className='todo-list'>
        <label>
          <input
            type="checkbox"
            checked={showActive}
            onChange={e => setShowActive(e.target.checked)}
          />
          Show only active todos
        </label>

          <ul>
            {visibleTodos.map(todo => (
              <li key={todo.id}>
                {todo.completed ? <s>{todo.text}</s> : todo.text}
              </li>
            ))}
          </ul>
      </div>

    </div>
  );
}