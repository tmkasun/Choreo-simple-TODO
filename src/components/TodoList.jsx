import React, { useState } from "react";
import { useDeleteTodo } from "../data/todos";
import { getVisibleTodos } from "../data/utilities";

import deleteIcon from "../images/delete.png";

export default function TodoList(props) {
    const { todos } = props;
    const [showActive, setShowActive] = useState(false);
    const visibleTodos = getVisibleTodos(todos.list, showActive);
    const { deleteTodo } = useDeleteTodo();

    return (
        <div className="todo-list">
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
            <ul>
                {visibleTodos.map((todo) => (
                    <li key={todo.id}>
                        <div className="todo-item">
                            <div className="todo-item-text">
                                <input
                                    id={`show-only-active-todos-${todo.id}`}
                                    type="checkbox"
                                    className="show-only-active"
                                    onChange={(e) => {
                                        e.preventDefault();
                                    }}
                                />
                                <label
                                    htmlFor={`show-only-active-todos-${todo.id}`}
                                >
                                    {todo.completed ? (
                                        <s>{todo.text}</s>
                                    ) : (
                                        todo.text
                                    )}
                                </label>
                            </div>

                            <div className="todo-item-actions">
                                <button
                                    onClick={() => {
                                        deleteTodo(todo);
                                    }}
                                    className="todo-action-delete"
                                >
                                    sadasdas sdas
                                    <img
                                        width={20}
                                        height={20}
                                        alt="Delete Icon"
                                        src={deleteIcon}
                                    ></img>
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
