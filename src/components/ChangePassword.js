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

export class ChangePassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            url_id: ''
        }
    }

    componentDidMount(){

        let url = window.location.href;
        let id_url = url.substring(url.lastIndexOf('/') + 1);

        this.setState({
            url_id: id_url
        })
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
                                Change Password
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ChangePassword
