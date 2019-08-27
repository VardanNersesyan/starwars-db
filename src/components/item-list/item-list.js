import React, { Component } from 'react';

import './item-list.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

export default class ItemList extends Component {

    state = {
        itemleList: null
    };

    componentDidMount() {

        const { getData } = this.props;

        getData()
            .then((itemleList) => {
                this.setState({
                    itemleList: itemleList
                });
            });
    }

    renderItems(arr) {
        return arr.map((item)=> {
            const  { id } = item;
            const lable = this.props.children(item);

            return (
                <li className="list-group-item"
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}>
                    {lable}
                </li>
            );
        });
    }


    render() {

        const { itemleList } = this.state;
        if (!itemleList) {
            return <Spinner/>;
        }

        const items = this.renderItems(itemleList);

        return (
            <ul className="item-list list-group">
                { items }
            </ul>
        );
    }
}