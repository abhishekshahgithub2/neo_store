import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import {domain} from '../urls/url';
import StarRatings from 'react-star-ratings';
import '../App.css';
import axios from 'axios'
import { Link } from "react-router-dom";
import {connect} from 'react-redux';


export class Product extends Component {

    constructor(props){
        super(props);

        this.state = {
            display: [],
            categories: [],
            colors: []
        }
    }

    componentDidMount(){
        let url = window.location.href;
        let id = url.substring(url.lastIndexOf('/') + 1);
        console.log(id);

        const value = {
            name: id
        }

        // axios.get(`${domain}/commonProducts`, value , { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
        axios.get(`${domain}/commonProducts`, {
            params: {
              category_id: '',  
              color_id: '',
              sortBy: '',
              sortIn: '',
              name: id,  
              pageNo: 0 ,
              perPage: 0
            }
          })
            .then(data=>this.setState({display: data.data.product_details}))


        fetch(`${domain}/getAllCategories`)
            .then(response => response.json())
            .then(data => this.setState({ categories: data.category_details }));
    
        fetch(`${domain}/getAllColors`)
            .then( response => response.json())
            .then(data => this.setState({ colors: data.color_details}));    

    }

    render() {
        return (
            <div>
                Search Product Page
                {this.state.display.map(item=>
                    <div>{item.product_name}</div>
                    )}
                {console.log('console test' + this.state.display)}
            </div>
        )
    }
}

export default Product
