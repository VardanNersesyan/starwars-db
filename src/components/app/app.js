import React, { Component } from 'react';

import Header from '../header';
import './app.css';
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import RandomPlanet from "../random-planet";
import { PeoplePage, PlanetsPage, StarshipPage } from '../pages';
import { SwapiServiceProvider } from "../swapi-service-context";

import { BrowserRouter as Router, Route } from "react-router-dom";
import StarshipDetails from "../sw-components/starship-details";


export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        hasError: false
    };

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true
        });
    }

    render() {
        const { hasError } = this.state;

        if (hasError) {
            return <ErrorIndicator/>;
        }


        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService}>
                    <Router>
                        <div className="container">
                            <Header />
                            <RandomPlanet />
                            <Route path="/" render={() => <h2>Welcome to StarDB</h2>} exact />
                            <Route path="/people" render={() => <h2>People</h2>} exact />
                            <Route path="/people" component={PeoplePage} />
                            <Route path="/planets" component={PlanetsPage} />
                            <Route path="/starships" exact component={StarshipPage} />
                            <Route path="/starships/:id" exact
                                    render={ ({ match, location, hostory}) => {
                                        const { id } = match.params;
                                        return <StarshipDetails itemId={id} />
                                    } }/>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}