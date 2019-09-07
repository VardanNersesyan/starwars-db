import React, { Component } from 'react';

import Header from '../header';
import './app.css';
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import RandomPlanet from "../random-planet";
import { PeoplePage, PlanetsPage, StarshipPage } from '../pages';
import { SwapiServiceProvider } from "../swapi-service-context";



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
                    <div className="container">
                        <Header />
                        <RandomPlanet />
                        <PeoplePage />
                        <PlanetsPage />
                        <StarshipPage />
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}