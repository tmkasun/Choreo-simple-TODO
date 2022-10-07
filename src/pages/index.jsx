// import { TokenExchangePlugin } from '@asgardeo/token-exchange-plugin';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import { useTodos } from '../data/hooks/todos.js';
import '../styles/App.css'
import LoginButton from '../components/Buttons/LoginButton.jsx';
import NewTodo from '../components/NewTodo';
import Callback from './oauth/Callback.jsx';
import useUser from '../data/hooks/user.js';
import Landing from '../components/Landing.jsx';
import BaseLayout from '../components/BaseLayout.jsx';
import Header from '../components/Header/Header.jsx';
import Login from './login/index.jsx';
import { useTaskGroups } from '../data/hooks/tasks.js';
import TasksGroup from '../components/Tasks/TasksGroup.jsx';
import NewTaskGroup from '../components/Tasks/NewTaskGroup.jsx';


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
                {taskGroups.map(group => <TasksGroup keey={group.id} group={group} />)}
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