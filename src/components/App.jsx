import React, { useState } from 'react';
import { useTodos } from '../data/todos.js';

import './App.css'
import NewTodo from './NewTodo';
import TodoList from './TodoList';

export default function App() {
  const {data: todos, isLoading, error, refetch} = useTodos();
  // const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);

  return (
    <div className='app-base'>
      <div className='new-todo-layout'>
        <NewTodo onAdd={refetch} />
      </div>
      {isLoading || !todos ? "Loading . . ." : <TodoList todos={todos} />}
    </div>
  );
}