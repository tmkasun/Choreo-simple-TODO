import { useEffect, useRef, useState } from 'react';
import '../../styles/Tasks/NewTasksGroup.css'
import NewTask from './NewTask';


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
            {openAddGroup && <NewTask ref={addNewGroupRef} onAdd={() => { }} />}
            {<span onClick={() => setOpenAddGroup(!openAddGroup)} className={openAddGroup ? 'close-character' : 'add-character'} />}
        </div>
    )
}