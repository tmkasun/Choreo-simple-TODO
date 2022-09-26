import React, { useState } from 'react';
import { initialTodos, getVisibleTodos } from '../data/todos.js';

import './App.css'
import NewTodo from './NewTodo';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const visibleTodos = getVisibleTodos(todos, showActive);

  return (
    <div className='app-base'>
      <div className='new-todo-layout'>
        <NewTodo onAdd={newTodo => setTodos([...todos, newTodo])} />
      </div>

      <div className='todo-list'>
        <div className='active-selector'>
          <input
            id='show-only-active-todos'
            type="checkbox"
            className='show-only-active'
            checked={showActive}
            onChange={e => setShowActive(e.target.checked)}
          />
          <label htmlFor='show-only-active-todos'>
            Show only active todos
          </label>
        </div>
        <ul>
          {visibleTodos.map(todo => (
            <li key={todo.id}>
              <div className='todo-item'>
                <div className='todo-item-text'>
                  <input
                    id={`show-only-active-todos-${todo.id}`}
                    type="checkbox"
                    className='show-only-active'
                    onChange={(e) => {e.preventDefault()}}
                  />
                  <label htmlFor={`show-only-active-todos-${todo.id}`}>
                    {todo.completed ? <s>{todo.text}</s> : todo.text}
                  </label>
                </div>

                <div className='todo-item-actions'>
                  <button className='todo-action-delete'>
                    Delete
                  </button>
                </div>

              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}