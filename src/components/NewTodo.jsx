import React, { useEffect, useState, useRef } from 'react';
import { useAddTodo } from '../data/hooks/todos.js';
import { createTodo } from '../data/utils/auth.js';

import '../styles/NewTodo.css';

export function NewTodo({ onAdd }) {
    const [text, setText] = useState('');
    const todoInputRef = useRef();
    const { addTodo, isLoading, error, data, isSuccess } = useAddTodo();
    useEffect(() => {
        if (isSuccess && data) {
            onAdd(data);
            setText('');
            todoInputRef.current.focus();
        }
    }, [isSuccess, data])
    function handleAddClick() {
        if (text !== '') {
            const newTodo = createTodo(text);
            addTodo(newTodo);
        }
    }

    return (
        <div className='new-todo'>
            <input ref={todoInputRef} placeholder="Type & press `Enter`" disabled={isLoading} value={text} autoFocus
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