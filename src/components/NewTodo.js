import React, { useState } from 'react';
import { createTodo } from '../data/todos.js';

import './NewTodo.css';

export function NewTodo({ onAdd }) {
    const [text, setText] = useState('');

    function handleAddClick() {
        setText('');
        onAdd(createTodo(text));
    }

    return (
        <div className='new-todo'>
            <input value={text} autoFocus 
            onKeyDown={(e) => {
                if (e.key === "Enter") {

                    handleAddClick()
                }
            }} 
            onChange={e => setText(e.target.value)} />
            <button onClick={handleAddClick}>
                Add
            </button>
        </div>
    );
}

export default NewTodo;