import React, { Component } from 'react';

import Header from '../header';
import './app.css';
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import RandomPlanet from "../random-planet";
import { PeoplePage, PlanetsPage, StarshipPage, LoginPage, SecretPage } from '../pages';
import { SwapiServiceProvider } from "../swapi-service-context";

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import StarshipDetails from "../sw-components/starship-details";
import PlanetDetails from "../sw-components/planet-details";


export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        hasError: false,
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        });
    };

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true
        });
    }

    render() {
        const { hasError, isLoggedIn } = this.state;

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
                            <Switch>
                                <Route path="/" render={() => <h2>Welcome to StarDB</h2>} exact />
                                <Route path="/people/:id?" component={PeoplePage} />
                                <Route path="/planets" component={PlanetsPage} exact />
                                <Route path="/planets/:id" render={({match}) => {
                                    const { id } = match.params;
                                    return <PlanetDetails itemId={id} />
                                }} />
                                <Route path="/starships" exact component={StarshipPage} />
                                <Route path="/starships/:id" exact
                                       render={ ({ match, location, hostory}) => {
                                           const { id } = match.params;
                                           return <StarshipDetails itemId={id} />
                                       } }/>
                                <Route path="/login"
                                       render={()=>{
                                           return <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />;
                                       }}/>
                                <Route path="/secret"
                                       render={()=>{
                                           return <SecretPage isLoggedIn={isLoggedIn}/>;
                                       }}/>
                               {/*<Redirect to="/" />*/}
                               <Route render={() => <h2>Page not found</h2>} />
                            </Switch>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}