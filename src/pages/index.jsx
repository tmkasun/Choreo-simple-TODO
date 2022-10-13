// import { TokenExchangePlugin } from '@asgardeo/token-exchange-plugin';
import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import '../styles/App.css'
import Callback from './oauth/Callback.jsx';
import useUser from '../data/hooks/user.js';
import BaseLayout from '../components/BaseLayout.jsx';
import Header from '../components/Header/Header.jsx';
import Login from './login/index.jsx';
import { useMoveTask, useTaskGroups } from '../data/hooks/tasks.js';
import TasksGroup from '../components/Tasks/TasksGroup.jsx';
import NewTaskGroup from '../components/Tasks/NewTaskGroup';
import { DragDropContext } from 'react-beautiful-dnd';
import Loading from '../components/Loading';
import Banner from '../components/Banner/Banner';


function App() {
    const { data: groups, isLoading, error, setData, refetch } = useTaskGroups();
    const { moveTask, isLoading: isMoving, data } = useMoveTask();
    const [moving, setMoving] = useState({})
    const user = useUser();
    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        const movingTaskId = parseInt(draggableId, 10);
        const sourceGroupId = parseInt(source.droppableId, 10);
        const destinationGroupId = parseInt(destination.droppableId, 10);
        const sourceTasksGroup = groups.find(group => group.id === sourceGroupId);
        const destinationTasksGroup = groups.find(group => group.id === destinationGroupId);
        const movingTask = sourceTasksGroup.tasks.find(task => task.id === movingTaskId);
        moveTask(movingTask, destinationGroupId, { onSuccess: () => (setMoving({ ...moving, [movingTaskId]: false })) });

        const updatedSourceTasks = sourceTasksGroup.tasks.filter(task => task.id !== movingTaskId);
        const updatedDestinationTasks = [...destinationTasksGroup.tasks, movingTask];
        const updatedGroups = groups.map(group => {
            if (group.id === sourceGroupId) {
                return { ...group, tasks: updatedSourceTasks }
            } else if (group.id === destinationGroupId) {
                return { ...group, tasks: updatedDestinationTasks }
            } else {
                return group;
            }
        });
        setData(updatedGroups);
        setMoving({ ...moving, [movingTaskId]: true })
    }
    if (!user) {
        return <Redirect to="/login" />
    }
    const onGroupUpdate = (updater) => {
        setData((currentGroups) => {
            const [groupId, updatedTaks] = updater(currentGroups);
            const updatedGroups = currentGroups.map(group => {
                if (group.id === groupId) {
                    return { ...group, tasks: updatedTaks };
                } else {
                    return group;
                }
            });
            return updatedGroups;
        });
    }
    return (
        <BaseLayout
            header={<Header />}
        >

            {isLoading && <div className='listing-notifications'> <Loading /></div>}
            {!isLoading && error && <div className='listing-notifications'><Banner error={error} /></div>}


            {!isLoading && groups && (
                <div className='task-list-container'>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {groups.map(group => <TasksGroup onGroupUpdate={onGroupUpdate} key={group.id} group={group} />)}
                    </DragDropContext>
                    <NewTaskGroup />
                </div>
            )}

        </BaseLayout>
    );
}

export default function Routing() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/oauth/callback" component={Callback} />
                <Route exact path="/login" component={Login} />
                <Route path="*" component={() => "Page not found!"} />
            </Switch>
        </Router>
    )
}