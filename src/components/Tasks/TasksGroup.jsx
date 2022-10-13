import { useTasksByGroup } from "../../data/hooks/tasks";
import NewTask from "./NewTask";
import TasksList from "./TasksList";

import '../../styles/Tasks/TasksGroup.css'

export default function TasksGroup(props) {
    const { group, onGroupUpdate } = props;
    const { id, name } = group;
    const { tasks } = group;
    const onDelete = (deletedTodo) => {
        onGroupUpdate(id, {
            list: taskGroups.list.filter(todo => deletedTodo.id !== todo.id),
            length: taskGroups.length - 1
        })
    }
    const onUpdate = (updatedTodo) => {
        onGroupUpdate(id, {
            list: taskGroups.list.map(todo => updatedTodo.id === todo.id ? updatedTodo : todo),
            length: taskGroups.length
        })
    }
    return (
        <div className='task-group-container'>
            <h3 className="task-group-name">{name}</h3>
            <div className='new-todo-layout'>
                <NewTask groupId={id} onAdd={newTask => onGroupUpdate(id, [...tasks, newTask])} />
            </div>
            <TasksList groupId={id} onRefresh={() => { }} onUpdate={onUpdate} onDelete={onDelete} tasks={tasks} />
            {tasks.length === 0 && "No any todo items."}
        </div>
    )
}