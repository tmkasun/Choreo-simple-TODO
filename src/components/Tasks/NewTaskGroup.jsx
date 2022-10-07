import { useEffect, useRef, useState } from 'react';
import '../../styles/Tasks/NewTasksGroup.css'
import { IconButton } from '../IconButton';
import NewTodo from '../NewTodo';


export default function NewTaskGroup(props) {
    const [openAddGroup, setOpenAddGroup] = useState(false);
    const addNewGroupRef = useRef();
    useEffect(() => {
        if (addNewGroupRef.current) {
            addNewGroupRef.current.childNodes[0].focus();
            addNewGroupRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }, [openAddGroup]);
    return (
        <div className='new-task-group-container'>
            {!openAddGroup && <span onClick={() => setOpenAddGroup(true)} className='add-character' />}
            {openAddGroup && <NewTodo ref={addNewGroupRef} onAdd={() => { }} />}
        </div>
    )
}