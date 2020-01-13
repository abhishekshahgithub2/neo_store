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

export class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            profile_data: [],
            first_name: '',
            last_name: '',
            gender: '',
            dob: '',
            phone_no: '',
            email: '',
            image: '',
            url_id: ''
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
        
        axios.get(`${domain}/getCustProfile`,{ headers: {"Authorization" : `${localStorage.getItem('token')}`} })
            .then(response => this.setState({
                first_name: response.data.customer_proile.first_name,
                last_name: response.data.customer_proile.last_name,
                gender: response.data.customer_proile.gender,
                dob: response.data.customer_proile.dob,
                phone_no: response.data.customer_proile.phone_no,
                email: response.data.customer_proile.email,
                image: response.data.customer_proile.profile_img
            }))
            // console.log(response.data.customer_proile.first_name)
            // .then(response => this.setState({profile_data:response.data}))


            // .then(data=> this.setState({profile_data:data.data}))
            // .then(console.log(response))

        // fetch(`${domain}/getCustProfile`, {
        //     credentials: 'include',
        //     headers: {
        //       'Authorization': `${localStorage.getItem('token')}`,
        //       'Access-Control-Allow-Origin':*,
        //     }
        //   })

        // .then(response => response.json())
        // .then(data => console.log(data))
        // .then(console.log('success'))

        // const AuthStr = 'Bearer '.concat(localStorage.getItem('token')); 
        // axios.get(`${domain}/getCustProfile`, { headers: { Authorization: AuthStr } })
        // .then(response => {
        //     // If request is good...
        //     console.log(response.data);
        // })
        // .catch((error) => {
        //     console.log('error ' + error);
        // });
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
                            {/* <img className="profile-pic-card" src={`${domain}/${this.state.image}`} />
                            <h5 className="center">{this.state.first_name}</h5>
                            <button className="profile-pic-btn">Order</button> <br/>
                            <button className="profile-pic-btn active">Profile</button> <br/>
                            <button className="profile-pic-btn">Address</button> <br/>   
                            <button className="profile-pic-btn">Change Password</button> <br/> */}
                        </Col>
                        <Col xs='8' className="prof-box">
                            <h4>Profile</h4>
                            <hr/>
                            <Row className="prof-text">
                                <Col xs='4'><h6>First Name</h6></Col><Col xs='8'>{this.state.first_name}</Col>
                            </Row>
                            <Row className="prof-text">    
                                <Col xs='4'><h6>Last Name</h6></Col><Col xs='8'>{this.state.last_name}</Col> 
                            </Row>
                            <Row className="prof-text">    
                                <Col xs='4'><h6>Gender</h6></Col><Col xs='8'>{this.state.gender}</Col> 
                            </Row>
                            <Row className="prof-text">    
                                <Col xs='4'><h6>Date of Birth</h6></Col><Col xs='8'>{this.state.dob}</Col> 
                            </Row>
                            <Row className="prof-text">    
                                <Col xs='4'><h6>Mobile Number</h6></Col><Col xs='8'>{this.state.phone_no}</Col> 
                            </Row>
                            <Row className="prof-text">    
                                <Col xs='4'><h6>Email</h6></Col><Col xs='8'>{this.state.email}</Col> 
                            </Row>                               
                        </Col>
                    </Row>
                </Container>

                {/* {this.state.profile_data} */}
                {/* {console.log(this.state.profile_data)} */}
        {/* {this.state.profile_data.customer_proile.map(item=><div>{item.first_name}</div>)} */}




                {/* {console.log(this.state.profile_data)}
                {console.log(this.state.profile_data.customer_proile)} */}




                
                {/* {console.log(this.state.profile_data.status_code.customer_profile)} */}
                {/* {this.state.profile_data.map(item=><div>{item}</div>)} */}
            </div>
        )
    }
}

export default Profile
