import { useTasksByGroup } from "../../data/hooks/tasks";
import NewTask from "./NewTask";
import TasksList from "./TasksList";

import '../../styles/Tasks/TasksGroup.css'

export default function TasksGroup(props) {
    const { group, onGroupUpdate } = props;
    const { id, name } = group;
    const { tasks } = group;
    const onDelete = (deletedTask) => {
        const updatedTasks = tasks.filter(task => task.id !== deletedTask.id)
        onGroupUpdate(id, updatedTasks)
    }
    const onUpdate = (updatedTask) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === updatedTask.id) {
                return updatedTask;
            } else {
                return { ...task }
            }
        })
        onGroupUpdate(id, updatedTasks)
    }
    const onAdd = (newTask) => {
        onGroupUpdate(id, [...tasks, newTask])
    }

    return (
        <div className='task-group-container'>
            <h3 className="task-group-name">{name}</h3>
            <div className='new-todo-layout'>
                <NewTask groupId={id} onAdd={onAdd} />
            </div>
            <TasksList groupId={id} onRefresh={() => { }} onUpdate={onUpdate} onDelete={onDelete} tasks={tasks} />
            {tasks.length === 0 && "No any todo items."}
        </div>
    )
}