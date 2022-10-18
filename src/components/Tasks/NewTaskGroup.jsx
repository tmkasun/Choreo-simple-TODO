import { useEffect, useRef, useState } from 'react';
import { useAddGroup } from '../../data/hooks/groups';
import '../../styles/Tasks/NewTasksGroup.css'
import InputWithButton from '../InputWithButton';


export default function NewTaskGroup(props) {
    const { onGroupAdd } = props;
    const [openAddGroup, setOpenAddGroup] = useState(false);
    const { addGroup, isLoading } = useAddGroup();
    const addNewGroupRef = useRef();
    useEffect(() => {
        if (addNewGroupRef.current) {
            addNewGroupRef.current.childNodes[0].focus();
            addNewGroupRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }, [openAddGroup]);
    const onSubmit = (newGroup) => addGroup({ name: newGroup }, { onSuccess: onGroupAdd })
    return (
        <div className='new-task-group-container'>
            {<span onClick={() => setOpenAddGroup(!openAddGroup)} className={openAddGroup ? 'close-character' : 'add-character'} />}
            {openAddGroup && <InputWithButton
                loading={isLoading}
                disabled={isLoading}
                onSubmit={onSubmit}
                buttonText="Add" loadingButtonText="Adding"
                inputProps={{ placeholder: "Add new Group" }}
                ref={addNewGroupRef} />}
        </div>
    )
}