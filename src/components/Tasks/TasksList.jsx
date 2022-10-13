import React, { useState } from "react";

import { TaskItem } from "./TaskItem";
import refreshButton from '../../images/refresh-button.svg';
import { IconButton } from "../IconButton";
import { Droppable } from "react-beautiful-dnd";
import '../../styles/Tasks/TasksList.css'
import { getActiveTasks } from "../../data/utils/tasks";

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "#d4dbe7a1" : "white",
    borderRadius: '1rem',
    boxShadow: isDraggingOver ? "rgb(204 219 232) 3px 3px 6px 0px inset, rgb(255 255 255 / 50%) -3px -3px 6px 1px inset" : 'none',

});

const TasksList = (props) => {
    const { tasks, onDelete, onUpdate, onRefresh, groupId } = props;
    const [showActive, setShowActive] = useState(false);
    const sortedByStatus = tasks.sort((a,b) => b.status.localeCompare(a.status))
    const visibleTasks = getActiveTasks(sortedByStatus, showActive);
    return (
        <div className="todo-list">
            <div className="todo-actions">
                <div className="active-selector">
                    <input
                        id="show-only-active-todos"
                        type="checkbox"
                        className="show-only-active"
                        checked={showActive}
                        onChange={(e) => setShowActive(e.target.checked)}
                    />
                    <label htmlFor="show-only-active-todos">
                        Show only active todos
                    </label>

                </div>
                <IconButton onClick={onRefresh} iconImage={refreshButton} />
            </div>
            <Droppable droppableId={`${groupId}`}>
                {(provided, snapshot) => (
                    <ul
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                        className='task-list-ul'
                    >
                        {visibleTasks.map((task, index) => (
                            <TaskItem index={index} onUpdate={onUpdate} groupId={groupId} onDelete={onDelete} key={task.id} task={task} />
                        ))}
                        {provided.placeholder}

                    </ul>
                )}

            </Droppable>
        </div>

    );
};

export default TasksList;