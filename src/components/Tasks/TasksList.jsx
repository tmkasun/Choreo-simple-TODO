import React, { useState } from "react";

import { TaskItem } from "./TaskItem";
import refreshButton from '../../images/refresh-button.svg';
import { IconButton } from "../IconButton";
import { getVisibleTodos } from "../../data/utils/auth";

export default function TasksList(props) {
    const { tasks, onDelete, onUpdate, onRefresh } = props;
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
            <ul>
                {visibleTodos.map((task) => (
                    <TaskItem onUpdate={onUpdate} onDelete={onDelete} key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
}
