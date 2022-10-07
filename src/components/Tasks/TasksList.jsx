import React, { forwardRef, useState } from "react";

import { TaskItem } from "./TaskItem";
import refreshButton from '../../images/refresh-button.svg';
import { IconButton } from "../IconButton";
import { getVisibleTodos } from "../../data/utils/auth";

const TasksList = forwardRef((props, ref) => {
    const { tasks, onDelete, onUpdate, onRefresh, groupId } = props;
    const [showActive, setShowActive] = useState(false);
    const visibleTodos = getVisibleTodos(tasks.list, showActive);

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
            <ul ref={ref}>
                {visibleTodos.map((task) => (
                    <TaskItem onUpdate={onUpdate} groupId={groupId} onDelete={onDelete} key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
});

export default TasksList;