import React, { useEffect, useState } from 'react';
import { useAddTodo } from '../data/todos.js';
import { createTodo } from '../data/utilities.js';

import './NewTodo.css';

export function NewTodo({ onAdd }) {
    const [text, setText] = useState('');
    const { addTodo, isLoading, error, data, isSuccess } = useAddTodo();
    useEffect(() => {
        if(isSuccess && data) {
            onAdd(data);
        }
    },[isSuccess, data])
    function handleAddClick() {
        if (text !== '') {
            const newTodo = createTodo(text);
            addTodo(newTodo);
            setText('');
        }
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
            <button disabled={text === '' || isLoading} onClick={handleAddClick}>
                {isLoading ? 'Adding' : 'Add'}
            </button>
        </div>
    );
}

export default NewTodo;