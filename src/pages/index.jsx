// import { TokenExchangePlugin } from '@asgardeo/token-exchange-plugin';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import '../styles/App.css'
import Callback from './oauth/Callback.jsx';
import useUser from '../data/hooks/user.js';
import BaseLayout from '../components/BaseLayout.jsx';
import Header from '../components/Header/Header.jsx';
import Login from './login/index.jsx';
import { useTaskGroups } from '../data/hooks/tasks.js';
import TasksGroup from '../components/Tasks/TasksGroup.jsx';
import NewTaskGroup from '../components/Tasks/NewTaskGroup';
import { DragDropContext } from 'react-beautiful-dnd';
import Loading from '../components/Loading';
import Banner from '../components/Banner/Banner';


function App() {
    const { data, isLoading, error, setData, refetch } = useTaskGroups();
    // const { data: todos, isLoading, error, setData, refetch } = useTodos();
    const user = useUser();
    const onDragEnd = (result) => {
    }

    if (!user) {
        return <Redirect to="/login" />
    }
    return (
        <BaseLayout
            header={<Header />}
        >

            {isLoading && <div className='listing-notifications'> <Loading /></div>}
            {!isLoading && error && <div className='listing-notifications'><Banner error={error} /></div>}


            {!isLoading && data && (
                <div className='task-list-container'>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {data.data.groups.map(group => <TasksGroup keey={group.id} group={group} />)}
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