import React from 'react';
import { useDraggable } from '@dnd-kit/core'

import { TASK_STATUS } from '../../data/hooks/tasks';
import { useDeleteTodo, useUpdateTodo } from '../../data/hooks/todos';
import deleteIcon from "../../images/delete.png";

import '../../styles/Tasks/TaskItem.css'
import { IconButton } from '../IconButton';

export function TaskItem(props) {
    const { task, onDelete, onUpdate, groupId } = props;
    const { deleteTodo, isLoading: isDeleting } = useDeleteTodo();
    const { updateTodo, isLoading: isUpdating } = useUpdateTodo();
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id + groupId,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        position: 'fixed'
    } : undefined;

    let className = 'todo-item-li';
    if (task.status === TASK_STATUS.INPROGRSS) {
        className += ' inprogress-task'
    } else if (task.status === TASK_STATUS.PENDING) {
        className += ' pending-task'
    } else if (task.status === TASK_STATUS.COMPLETED) {
        className += ' completed-task'
    }
    return (
        <li ref={setNodeRef} style={style} {...listeners} {...attributes} className={className}>
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