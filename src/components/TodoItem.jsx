import React from 'react';
import { useDeleteTodo, useUpdateTodo } from '../data/hooks';
import deleteIcon from "../images/delete.png";

import '../styles/TodoItem.css'
import { IconButton } from './IconButton';

export function TodoItem(props) {
    const { todo, onDelete, onUpdate } = props;
    const { deleteTodo, isLoading: isDeleting } = useDeleteTodo();
    const { updateTodo, isLoading: isUpdating } = useUpdateTodo();

    return (
        <li className='todo-item-li'>
            {(isDeleting || isUpdating) && <div className='todo-item-overlay'>
                {isUpdating && `Updating . . .`}
                {isDeleting && `Deleting . . .`}
            </div>}
            <div className="todo-item">
                <div className="todo-item-text">
                    <input
                        checked={todo.done}
                        id={`show-only-active-todos-${todo.id}`}
                        type="checkbox"
                        className="show-only-active"
                        onChange={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const { checked: done } = e.target;
                            updateTodo({ ...todo, done }, { onSuccess: onUpdate });
                        }}
                    />
                    <label
                        htmlFor={`show-only-active-todos-${todo.id}`}
                    >
                        {todo.done ? (
                            <s style={{ color: '#838282' }}>{todo.text}</s>
                        ) : (
                            todo.text
                        )}
                    </label>
                </div>

                <div className="todo-item-actions">
                    <IconButton
                        disabled={isDeleting}
                        onClick={() => {
                            deleteTodo(todo, { onSuccess: onDelete });
                        }}
                        iconImage={deleteIcon}
                        alt="Delete Icon"
                    />
                </div>
            </div>
        </li>
    )
};