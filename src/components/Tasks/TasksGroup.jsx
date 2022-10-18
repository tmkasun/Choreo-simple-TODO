import React from 'react';
import NewTask from "./NewTask";
import TasksList from "./TasksList";

import '../../styles/Tasks/TasksGroup.css'
import Dropdown from '../Dropdown';

function TasksGroup(props) {
    const { group, onGroupUpdate, movingTasks } = props;
    const { id, name } = group;
    const { tasks } = group;
    const onDelete = (deletedTask) => {
        onGroupUpdate((currentGroups) => {
            const currentTasks = currentGroups.find(group => group.id === id).tasks;
            const updatedTasks = currentTasks.filter(task => task.id !== deletedTask.id)
            return [id, updatedTasks];
        })
    }
    const onUpdate = (updatedTask) => {
        onGroupUpdate((currentGroups) => {
            const currentTasks = currentGroups.find(group => group.id === id).tasks;
            const updatedTasks = currentTasks.map(task => {
                if (task.id === updatedTask.id) {
                    return updatedTask;
                } else {
                    return { ...task }
                }
            })
            return [id, updatedTasks];
        })
    }
    const onAdd = (newTask) => {
        onGroupUpdate((currentGroups) => {
            const currentTasks = currentGroups.find(group => group.id === id).tasks;
            return [id, [...currentTasks, newTask]];
        })
    }

    return (
        <div className='task-group-container'>
            <div className='group-header'>
                <div className='group-header-content'>
                    <h2 className="task-group-name">{name}</h2>
                </div>
                <Dropdown horizontal values={['delete', 'edit']} onChange={() => { }} />
            </div>
            <div className='new-todo-layout'>
                <NewTask groupId={id} onAdd={onAdd} />
            </div>
            <TasksList movingTasks={movingTasks} groupId={id} onRefresh={() => { }} onUpdate={onUpdate} onDelete={onDelete} tasks={tasks} />
            {tasks.length === 0 && "No tasks available."}
        </div>
    )
}

export default React.memo(TasksGroup);