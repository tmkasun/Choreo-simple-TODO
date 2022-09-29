// import { TokenExchangePlugin } from '@asgardeo/token-exchange-plugin';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useTodos } from '../data/hooks/todos.js';
import '../styles/App.css'
import LoginButton from '../components/LoginButton.jsx';
import NewTodo from '../components/NewTodo';
import TodoList from '../components/TodoList';
import Callback from './oauth/Callback.jsx';
import useUser from '../data/hooks/user.js';
import Landing from '../components/Landing.jsx';
// import { default as authConfig } from "../data/authConfig.json";


function App() {
    const { data: todos, isLoading, error, setData, refetch } = useTodos();
    const user = useUser();
    const onDelete = (deletedTodo) => {
        setData({
            list: todos.list.filter(todo => deletedTodo.id !== todo.id),
            length: todos.length - 1
        })
    }
    const onUpdate = (updatedTodo) => {
        setData({
            list: todos.list.map(todo => updatedTodo.id === todo.id ? updatedTodo : todo),
            length: todos.length
        })
    }
    return (
        <div className='main-container'>
            {user && <div className='top-bar'><LoginButton /></div>}
            <div className='app-base'>
                {user ? (
                    <>
                        <div className='new-todo-layout'>
                            <NewTodo onAdd={newTodo => setData({ list: [...todos.list, newTodo], length: todos.length + 1 })} />
                        </div>
                        {isLoading || !todos ? "Loading . . ." : <TodoList onRefresh={refetch} onUpdate={onUpdate} onDelete={onDelete} todos={todos} />}
                        {todos && todos.list.length === 0 && "No any todo items."}
                    </>
                ) : <Landing />}
            </div>
        </div>
    );
}

export default function Routing() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/oauth/callback" component={Callback} />
                <Route path="*" component={() => "Page not found!"} />
            </Switch>
        </Router>
    )
}