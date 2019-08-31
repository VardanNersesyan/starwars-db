import React, { Component } from 'react';

import './item-details.css';
import SwapiService from "../../services/swapi-service";


const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{ item[field] }</span>
        </li>
    );
};

export {
    Record
};


export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        image: null
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.itemId !== prevProps.itemId) {
            this.setState({
                loading: true
            });
            this.updateItem();
        }
    }

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    image: getImageUrl(item)
                });
            });
    }

    render() {

        if (!this.state.item) {
            return <span>Select a item from a list</span>;
        }

        const {
            item,
            item: {
                name
            },
            image
        } = this.state;

        return (
            <div className="item-details card">
                <img className="item-image"
                     src={image}
                     alt="character"/>

                <div className="card-body"
                    dataitemId={this.props.itemId}>
                    <h4>{ name }</h4>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, { item });
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}