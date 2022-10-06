import React from 'react';
import { TASK_STATUS } from '../../data/hooks/tasks';
import { useDeleteTodo, useUpdateTodo } from '../../data/hooks/todos';
import deleteIcon from "../../images/delete.png";

import '../../styles/Tasks/TaskItem.css'
import { IconButton } from '../IconButton';

export function TaskItem(props) {
    const { task, onDelete, onUpdate } = props;
    const { deleteTodo, isLoading: isDeleting } = useDeleteTodo();
    const { updateTodo, isLoading: isUpdating } = useUpdateTodo();
    let className = 'todo-item-li';
    if (task.status === TASK_STATUS.INPROGRSS) {
        className += ' inprogress-task'
    } else if (task.status === TASK_STATUS.PENDING) {
        className += ' pending-task'
    } else if (task.status === TASK_STATUS.COMPLETED) {
        className += ' completed-task'
    }
    return (
        <li className={className}>
            {(isDeleting || isUpdating) && <div className='todo-item-overlay'>
                {isUpdating && `Updating . . .`}
                {isDeleting && `Deleting . . .`}
            </div>}
            <div className="todo-item">
                <div className="todo-item-text">
                    <input
                        checked={task.done}
                        id={`show-only-active-todos-${task.id}`}
                        type="checkbox"
                        className="show-only-active"
                        onChange={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const { checked: done } = e.target;
                            updateTodo({ ...task, done }, { onSuccess: onUpdate });
                        }}
                    />
                    <label
                        htmlFor={`show-only-active-todos-${task.id}`}
                    >
                        {task.done ? (
                            <s style={{ color: '#838282' }}>{task.text}</s>
                        ) : (
                            task.text
                        )}
                    </label>
                </div>

                <div className="todo-item-actions">
                    <IconButton
                        disabled={isDeleting}
                        onClick={() => {
                            deleteTodo(task, { onSuccess: onDelete });
                        }}
                        iconImage={deleteIcon}
                        alt="Delete Icon"
                    />
                </div>
            </div>
        </li>
    )
};