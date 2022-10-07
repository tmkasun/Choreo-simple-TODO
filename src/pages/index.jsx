// import { TokenExchangePlugin } from '@asgardeo/token-exchange-plugin';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { DndContext } from '@dnd-kit/core';

import '../styles/App.css'
import Callback from './oauth/Callback.jsx';
import useUser from '../data/hooks/user.js';
import BaseLayout from '../components/BaseLayout.jsx';
import Header from '../components/Header/Header.jsx';
import Login from './login/index.jsx';
import { useTaskGroups } from '../data/hooks/tasks.js';
import TasksGroup from '../components/Tasks/TasksGroup.jsx';
import NewTaskGroup from '../components/Tasks/NewTaskGroup';


function App() {
    const { data: taskGroups, isLoading, error, setData, refetch } = useTaskGroups();
    // const { data: todos, isLoading, error, setData, refetch } = useTodos();
    const user = useUser();

    if (!user) {
        return <Redirect to="/login" />
    }
    return (
        <BaseLayout
            header={<Header />}
        >
            <div className='task-list-container'>
                <DndContext>
                    {taskGroups.map(group => <TasksGroup keey={group.id} group={group} />)}
                </DndContext>
                <NewTaskGroup />
            </div>
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