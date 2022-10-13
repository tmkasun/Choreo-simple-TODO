import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { TASK_STATUS, useDeleteTask, useUpdateTask } from '../../data/hooks/tasks';
import { useDeleteTodo, useUpdateTodo } from '../../data/hooks/todos';
import deleteIcon from "../../images/delete.png";

import '../../styles/Tasks/TaskItem.css'
import Dropdown from '../Dropdown';
import { IconButton } from '../IconButton';

const getItemStyle = (isDragging, draggableStyle, status) => ({
    // change background colour if dragging
    background: isDragging ? "#59b7ffa6" : status === TASK_STATUS.INPROGRSS ? '#8ac926a6' : status === TASK_STATUS.OPEN ? '#ffca3aa6' : status === TASK_STATUS.COMPLETED && '#ff595ea6',
    // styles we need to apply on draggables
    ...draggableStyle
});

export function TaskItem(props) {
    const { task, onDelete, onUpdate, groupId, index } = props;
    const { deleteTask, isLoading: isDeleting } = useDeleteTask();
    const { updateTask, isLoading: isUpdating } = useUpdateTask();
    
    return (
        <Draggable
            draggableId={`${task.id}`}
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
                    className='todo-item-li'>
                    {(isDeleting || isUpdating) && <div className='todo-item-overlay'>
                        {isUpdating && `Updating . . .`}
                        {isDeleting && `Deleting . . .`}
                    </div>}
                    <div className="todo-item">
                        <div className="todo-item-text">
                            <input
                                checked={task.status === TASK_STATUS.COMPLETED}
                                id={`show-only-active-todos-${task.id}`}
                                type="checkbox"
                                className="show-only-active"
                                onChange={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const { checked } = e.target;
                                    const updatedTask = { ...task };
                                    if (checked) {
                                        updatedTask.status = TASK_STATUS.COMPLETED;
                                    } else {
                                        updatedTask.status = TASK_STATUS.INPROGRSS;
                                    }
                                    updateTask(updatedTask, { onSuccess: onUpdate });
                                }}
                            />
                            <label
                                htmlFor={`show-only-active-todos-${task.id}`}
                            >
                                {task.status === TASK_STATUS.COMPLETED ? (
                                    <s style={{ color: '#838282' }}>{task.title}</s>
                                ) : (
                                    task.title
                                )}
                            </label>
                        </div>

                        <div className="todo-item-actions">
                            <IconButton
                                disabled={isDeleting}
                                onClick={() => {
                                    deleteTask(task, { onSuccess: onDelete });
                                }}
                                iconImage={deleteIcon}
                                alt="Delete Icon"
                            />
                            <Dropdown />
                        </div>
                    </div>
                </li>
            )}
        </Draggable>
    )
};