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

export class Address extends Component {
    constructor(props){
        super(props);
        this.state = {
            url_id: '',
            address: []
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
        
        axios.get(`${domain}/getCustAddress`,{ headers: {"Authorization" : `${localStorage.getItem('token')}`} })
            // .then(response => console.log(response.data.customer_address))
            .then(response => this.setState({address: response.data.customer_address}))
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
                        <Col xs='8' className="prof-box">
                            <h4>Addresses</h4>
                            <hr/>
                                {this.state.address.map((item,index)=>  
                                    <div key={index}>
                                        <Row>
                                            <Col xs='12' className="prof-mini">
                                                <div>{item.address}</div> 
                                                <div>{item.city} {item.pincode} </div> 
                                                <div>{item.country}</div>
                                            </Col>
                                        </Row>
                                    </div>
                                )}
                                <button>Add Address</button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Address
