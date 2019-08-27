import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';


import './app.css';
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import SwapiService from "../../services/swapi-service";

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
            <div className="container">
                <Header />
                <RandomPlanet />
                <PeoplePage />

            </div>
        );
    }
}