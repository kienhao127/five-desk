import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from "../layouts/Home/Home.jsx";
import Agent from "./../layouts/Agent/Agent.jsx";
import { meFromToken } from '../api/AppApi.js';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
    }

    render() {
        return (
            <Switch>
                <Route path={"/agent"} component={Agent} />
                <Route path={"/"} component={Home} />
                <Redirect from={"/"} to={"/home"}/>
            </Switch>     
        );
    }
}

export default App;