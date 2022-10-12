import { useTasksByGroup } from "../../data/hooks/tasks";
import NewTodo from "../NewTodo";
import TasksList from "./TasksList";

import '../../styles/Tasks/TasksGroup.css'

export default function TasksGroup(props) {
    const { group } = props;
    const { id, name } = group;
    const { tasks } = group;
    const onDelete = (deletedTodo) => {
        setData({
            list: taskGroups.list.filter(todo => deletedTodo.id !== todo.id),
            length: taskGroups.length - 1
        })
    }
    const onUpdate = (updatedTodo) => {
        setData({
            list: taskGroups.list.map(todo => updatedTodo.id === todo.id ? updatedTodo : todo),
            length: taskGroups.length
        })
    }
    return (
        <div className='task-group-container'>
            <h3 className="task-group-name">{name}</h3>
            <div className='new-todo-layout'>
                <NewTodo onAdd={newTodo => setData({ list: [...tasks, newTodo], length: tasks.length + 1 })} />
            </div>
            <TasksList groupId={id} onRefresh={() => { }} onUpdate={onUpdate} onDelete={onDelete} tasks={tasks} />
            {tasks.length === 0 && "No any todo items."}
        </div>
    )
}