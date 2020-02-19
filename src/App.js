import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom"
import MainPage from "../src/screens/MainPage/MainPage"
import Favorites from "../src/screens/Favorites/Favorites"
import EventPage from "../src/screens/EventPage/EventPage"
import Search from "../src/screens/Search/Search"
import './App.scss';

function App() {
    return (
        <Switch>
            <Route path="/favorites" component={Favorites} />
            <Route path="/search/?q=:searchRequest" component={Search} />
            <Route path="/search" component={Search} />
            <Route path="/event/:link" component={EventPage} />
            <Redirect from="/event/" to="/all" />
            <Route path="/:id" component={MainPage} />
            <Redirect from="/" to="/all" />
        </Switch>
    )
}

export default App;