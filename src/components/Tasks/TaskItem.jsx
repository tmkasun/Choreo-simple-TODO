import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { TASK_STATUS } from '../../data/hooks/tasks';
import { useDeleteTodo, useUpdateTodo } from '../../data/hooks/todos';
import deleteIcon from "../../images/delete.png";

import '../../styles/Tasks/TaskItem.css'
import { IconButton } from '../IconButton';

const getItemStyle = (isDragging, draggableStyle, status) => ({
    // change background colour if dragging
    background: isDragging ? "#59b7ffa6" : status === TASK_STATUS.INPROGRSS ? '#8ac926a6' : status === TASK_STATUS.PENDING ? '#ffca3aa6': status === TASK_STATUS.COMPLETED && '#ff595ea6' ,
    // styles we need to apply on draggables
    ...draggableStyle
});

export function TaskItem(props) {
    const { task, onDelete, onUpdate, groupId, index } = props;
    const { deleteTodo, isLoading: isDeleting } = useDeleteTodo();
    const { updateTodo, isLoading: isUpdating } = useUpdateTodo();

    let className = 'todo-item-li';
    
    return (
        <Draggable
            draggableId={`${task.id}=${groupId}`}
            index={index}
        >
            {(provided, snapshot) => (
                <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        task.status
                    )}
                    className={className}>
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
            )}
        </Draggable>
    )
};