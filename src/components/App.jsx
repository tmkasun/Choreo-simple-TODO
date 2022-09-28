import React, { useState } from 'react';
import { useTodos } from '../data/hooks.js';

import '../styles/App.css'
import NewTodo from './NewTodo';
import TodoList from './TodoList';

export default function App() {
  const { data: todos, isLoading, error, setData, refetch } = useTodos();
  const onDelete = (deletedTodo) => {
    setData({
      list: todos.list.filter(todo => deletedTodo.id !== todo.id),
      length: todos.length - 1
    })
  }
  const onUpdate = (updatedTodo) => {
    setData({
      list: todos.list.map(todo => updatedTodo.id === todo.id ? updatedTodo : todo),
      length: todos.length
    })
  }
  return (
    <div className='app-base'>
      <div className='new-todo-layout'>
        <NewTodo onAdd={newTodo => setData({ list: [...todos.list, newTodo], length: todos.length + 1 })} />
      </div>
      {isLoading || !todos ? "Loading . . ." : <TodoList onRefresh={refetch} onUpdate={onUpdate} onDelete={onDelete} todos={todos} />}
      {todos && todos.list.length === 0 && "No any todo items."}
    </div>
  );
}