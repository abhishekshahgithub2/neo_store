import React, { Component } from 'react'
import {domain} from '../urls/url';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import '../App.css';
import ProfileCard from './ProfileCard';

export class Order extends Component {
    constructor(props){
        super(props);
        this.state = {
            url_id: '',
            orders: []
        }
    }

    componentDidMount(){

        let url = window.location.href;
        let id_url = url.substring(url.lastIndexOf('/') + 1);

        this.setState({
            url_id: id_url
        })

        const config = {     
            headers: { 'Authorization' : `${localStorage.getItem('token')}`,'Accept': 'application/json' }
        }
        
        axios.get(`${domain}/getOrderDetails`,{ headers: {"Authorization" : `${localStorage.getItem('token')}`} })
            // .then(response => console.log(response.data.product_details))
            .then(response => this.setState({orders: response.data.product_details}))


    }

    render() {
        return (
            <div>
                <Container>
                    <Row>My Account</Row>
                    <hr/>
                    <Row>
                        <Col xs='4'>
                            <ProfileCard url_id={this.state.url_id}/>
                        </Col>
                        <Col xs='8'>
                            <h4>Profile</h4>
                            <hr/>
                            <Row>
                                {/* {this.state.orders.map((item,index)=>
                                <div key={index}>{item}</div>
                                )} */}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Order
