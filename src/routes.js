import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import App from './Container/home/App';
import EntryForm from './features/container/EntryComponent';
import PageNotFound from './Container/PageNotFound';


const routes = (props) => {
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={App} />
                <Route
                    exact
                    path="/entryform"
                    component={EntryForm} />
                <Route
                    path=""
                    component={PageNotFound} />
            </Switch>
        </Router>
    );
}

export default routes;