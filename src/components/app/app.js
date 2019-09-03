import React, { Component } from 'react';

import Header from '../header';
import './app.css';
import ErrorIndicator from "../error-indicator";
import ItemDetails, { Record } from "../item-details";
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import ErrorBoundry from "../error-boundry";
import RandomPlanet from "../random-planet";
import PeoplePage from "../people-page";
import ItemList from "../item-list";

import { SwapiServiceProvider } from "../swapi-service-context";

import {
    PersonList,
    PlanetList,
    StarshipList,
    PersonDetails,
    PlanetDetails,
    StarshipDetails
} from '../sw-components';

export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
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
                        {/*<RandomPlanet />
                        <PeoplePage />*/}

                        <PersonDetails itemId={11} />
                        <PlanetDetails itemId={5} />
                        <StarshipDetails itemId={9} />

                        <PersonList />
                        <StarshipList />
                        <PlanetList />

                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}