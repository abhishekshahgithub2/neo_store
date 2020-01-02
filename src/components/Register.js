import React, { Component } from 'react'

import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, Row , Card
  } from 'reactstrap';

  

import { Link } from "react-router-dom";

const axios = require('axios');


export class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            firstname:'',
            lastname:'',
            confirmPassword:'',
            phone:'',
            disable: true,
            emailError:'',
            passwordError:'',
            firstnameError:'',
            lastnameError:'',
            confirmPasswordError:'',
            phoneError:'',
            gender:''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    }

    handleGender = (e) => {
        this.setState({
            gender: e.target.value
        })
    }

    validate = () => {
        let emailError = "";
        let passwordError = "";
        let firstnameError = "";
        let lastnameError = "";
        let confirmPasswordError = "";
        let phoneError = "";

        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // if(!this.state.email.includes('@')){
        //     emailError = 'invalid Email';
        // }

        if(!re.test(this.state.email)){
            emailError = 'Invalid Email , should be of format xyz@abc.com ';
        }

        if(this.state.password.length < 8){
            passwordError = 'min length of password should be 8';
        }

        if(!this.state.firstname){
            firstnameError = 'First Name is required';
        }

        if(!this.state.lastname){
            lastnameError = 'Last name is required';
        }

        if(!this.state.phone){
            phoneError = 'Phone no is required';
        }   

        if(!this.state.confirmPassword){
            confirmPasswordError = 'Confirm password is required';
        }

        if(this.state.password !== this.state.confirmPassword){
            confirmPasswordError = 'Passwords do not match';
        }

        if(emailError || passwordError || firstnameError || lastnameError || phoneError || confirmPasswordError){
            this.setState({ emailError , passwordError , firstnameError , lastnameError , phoneError , confirmPasswordError});
            return false;
        }

        return true;

    };

    handleSubmit = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if(isValid){


            const user = {
                first_name: this.state.firstname,
                last_name: this.state.lastname,
                email: this.state.email,
                pass: this.state.password,
                confirmPass: this.state.confirmPassword,
                phone_no: this.state.phone,
                gender: this.state.gender
            };

            // console.log(user);

            axios.post('http://180.149.241.208:3022/register',user).then( res => console.log(res.data));
            

            // console.log(this.state);
            this.setState({
                email:'',
                password:'',
                firstname:'',
                lastname:'',
                confirmPassword:'',
                phone:'',
                emailError: '',
                passwordError: '',
                emailError:'',
                passwordError:'',
                firstnameError:'',
                lastnameError:'',
                confirmPasswordError:'',
                phoneError:'',
                gender:''
            })
        }

    }

    handleEnter = () => {
        this.validate();
    }



    render() {
        return (
            <div>
                <Container className="App">
                    <Row className="section-login">
                        <Col>
                            <Card className="form-card">
                            <h2>Register to NeoSTORE</h2>
                                <Form className="form" onSubmit={this.handleSubmit}>
                                    <Col>
                                        <FormGroup>
                                        <Label>First Name</Label>
                                        <Input
                                            name="firstname"
                                            type="text" 
                                            placeholder="Enter firstname" 
                                            value={this.state.firstname} 
                                            onChange={this.handleChange} 
                                            onKeyUp={this.handleEnter}
                                        />
                                        {this.state.firstnameError ? (<div style={{ fontSize: 12 , color: "red"}}>{this.state.firstnameError}</div>) : null }
                                        </FormGroup>
                                    </Col>

                                    <Col>
                                        <FormGroup>
                                        <Label>Last Name</Label>
                                        <Input
                                            name="lastname"
                                            type="text" 
                                            placeholder="Enter lastname" 
                                            value={this.state.lastname} 
                                            onChange={this.handleChange} 
                                            onKeyUp={this.handleEnter}
                                        />
                                        {this.state.lastnameError ? (<div style={{ fontSize: 12 , color: "red"}}>{this.state.lastnameError}</div>) : null }
                                        </FormGroup>
                                    </Col>
                                    
                                    <Col>
                                        <FormGroup>
                                        <Label>Email</Label>
                                        <Input
                                            name="email"
                                            type="text" 
                                            placeholder="Email Address" 
                                            value={this.state.email} 
                                            onChange={this.handleChange} 
                                            onKeyUp={this.handleEnter}
                                        />
                                        {this.state.emailError ? (<div style={{ fontSize: 12 , color: "red"}}>{this.state.emailError}</div>) : null }
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                        <Label>Password</Label>
                                        <Input
                                            name="password"
                                            type="password" 
                                            placeholder="Password" 
                                            value={this.state.password} 
                                            onChange={this.handleChange} 
                                            onKeyUp={this.handleEnter}
                                        />
                                        {this.state.passwordError ? (<div style={{ fontSize: 12 , color: "red"}}>{this.state.passwordError}</div>) : null }
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                        <Label>Confirm Password</Label>
                                        <Input
                                            name="confirmPassword"
                                            type="password" 
                                            placeholder="confirmPassword" 
                                            value={this.state.confirmPassword} 
                                            onChange={this.handleChange} 
                                            onKeyUp={this.handleEnter}
                                        />
                                        {this.state.confirmPasswordError ? (<div style={{ fontSize: 12 , color: "red"}}>{this.state.confirmPasswordError}</div>) : null }
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                        <Label>Phone No:</Label>
                                        <Input
                                            name="phone"
                                            type="number" 
                                            placeholder="phone number" 
                                            value={this.state.phone} 
                                            onChange={this.handleChange} 
                                            onKeyUp={this.handleEnter}
                                        />
                                        {this.state.phoneError ? (<div style={{ fontSize: 12 , color: "red"}}>{this.state.phoneError}</div>) : null }
                                        </FormGroup>
                                    </Col>
                                    <div onChange={this.handleGender}>
                                        <input type="radio" value="MALE" name="gender"/> Male
                                        <input type="radio" value="FEMALE" name="gender"/> Female
                                    </div>
                                    <Button disabled={ this.state.email.length > 0 && this.state.password.length > 0 && this.state.firstname.length > 0 && this.state.lastname.length > 0 && this.state.confirmPassword.length > 0 && this.state.phone.length > 0 && this.state.gender.length > 0 ? false : true }>Register</Button>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <hr/>
                <Container className="App">
                    <Row className="section-login">
                        <Col>
                            <Row>
                                <Col>
                                    <button className="social-btn-1">
                                        <img src="https://img.icons8.com/material/24/000000/facebook--v1.png"></img>
                                        <span className="socialLogin">Login with Facebook</span>
                                    </button>
                                </Col>
                                <Col>
                                    <button className="social-btn-2">
                                        <img src="https://img.icons8.com/material/24/000000/google-logo.png"></img>
                                        <span className="socialLogin">Login with Google</span>
                                    </button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>        
            </div>
        )
    }
}

export default Register
