import React, { Component } from 'react'
import {domain} from '../urls/url';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import '../App.css';
import { Link } from "react-router-dom";
import defProfile from "../assets/images/profile-placeholder.png";

export class ProfileCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            first_name:'',
            image:''
        }
    }

    componentDidMount(){

        const config = {     
            headers: { 'Authorization' : `${localStorage.getItem('token')}`,'Accept': 'application/json' }
        }
        
        axios.get(`${domain}/getCustProfile`,{ headers: {"Authorization" : `${localStorage.getItem('token')}`} })
            .then(response => this.setState({
                first_name: response.data.customer_proile.first_name,
                image: response.data.customer_proile.profile_img
            }))
    }

    render() {
        return (
            <div>
                { this.state.image ? 
                    <img className="profile-pic-card" src={`${domain}/${this.state.image}`} /> 
                        : 
                    <img className="profile-pic-card" src={defProfile} /> 
                }
                
                <h5 className="center">{this.state.first_name}</h5>
                {/* {this.props.url_id} */}
                <Link to="/order"><button className={this.props.url_id === 'order' ? 'profile-pic-btn active' : 'profile-pic-btn'}>Order</button></Link> <br/>
                <Link to="/profile"><button className={this.props.url_id === 'profile' ? 'profile-pic-btn active' : 'profile-pic-btn'}>Profile</button></Link> <br/>
                <Link to="/address"><button className={this.props.url_id === 'address' ? 'profile-pic-btn active' : 'profile-pic-btn'}>Address</button></Link> <br/>   
                <Link to="/changepassword"><button className={this.props.url_id === 'changepassword' ? 'profile-pic-btn active' : 'profile-pic-btn'}>Change Password</button></Link> <br/>         
            </div>
        )
    }
}

export default ProfileCard
