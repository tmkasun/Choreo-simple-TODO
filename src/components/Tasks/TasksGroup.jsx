import React, { useState } from 'react';
import NewTask from './NewTask';
import TasksList from './TasksList';

import '../../styles/Tasks/TasksGroup.css';
import Dropdown from '../Dropdown';
import { useDeleteGroup } from '../../data/hooks/groups';

export const GROUP_ACTIONS = {
    EDIT: 'edit',
    DELETE: 'delete',
};

function TasksGroup(props) {
    const { group, onGroupUpdate, movingTasks } = props;
    const { id, name } = group;
    const { tasks } = group;
    const { deleteGroup } = useDeleteGroup();
    const [isEditing, setIsEditing] = useState(false);
    const onDelete = (deletedTask) => {
        onGroupUpdate((currentGroups) => {
            const currentTasks = currentGroups.find(
                (group) => group.id === id
            ).tasks;
            const updatedTasks = currentTasks.filter(
                (task) => task.id !== deletedTask.id
            );
            return [id, updatedTasks];
        });
    };
    const onUpdate = (updatedTask) => {
        onGroupUpdate((currentGroups) => {
            const currentTasks = currentGroups.find(
                (group) => group.id === id
            ).tasks;
            const updatedTasks = currentTasks.map((task) => {
                if (task.id === updatedTask.id) {
                    return updatedTask;
                } else {
                    return { ...task };
                }
            });
            return [id, updatedTasks];
        });
    };
    const onAdd = (newTask) => {
        onGroupUpdate((currentGroups) => {
            const currentTasks = currentGroups.find(
                (group) => group.id === id
            ).tasks;
            return [id, [...currentTasks, newTask]];
        });
    };

    const onGroupDelete = (deletedGroupId) => {
        onGroupUpdate(() => [deletedGroupId]);
    };

    const handleGroupUpdate = (selection) => {
        setIsEditing(true);
        if (selection === GROUP_ACTIONS.DELETE) {
            deleteGroup(group.id, { onSuccess: onGroupDelete });
        }
        if (selection === GROUP_ACTIONS.EDIT) {
        }
    };
    return (
        <div className="task-group-container">
            {isEditing && (
                <div className="group-deleting-overlay">Deleting . . .</div>
            )}
            <div className="group-header">
                <div className="group-header-content">
                    <h5 className="task-group-name">{name}</h5>
                </div>
                {id > 12 && (
                    <Dropdown
                        horizontal
                        values={Object.values(GROUP_ACTIONS)}
                        onChange={handleGroupUpdate}
                    />
                )}
            </div>
            <div className="new-todo-layout">
                <NewTask groupId={id} onAdd={onAdd} />
            </div>
            <TasksList
                movingTasks={movingTasks}
                groupId={id}
                onUpdate={onUpdate}
                onDelete={onDelete}
                tasks={tasks}
            />
        </div>
    );
}

export default React.memo(TasksGroup);
