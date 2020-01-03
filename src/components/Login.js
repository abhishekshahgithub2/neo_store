import React, { Component } from 'react'

import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, Row , Card
  } from 'reactstrap';

import { Link } from "react-router-dom";

import ModalExample from './ModalExample';

import '../App.css';

import { useState } from 'react';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// import Loader from './Loader';

import Modal2 from './Modal2';

import Loader from 'react-loader-spinner';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const axios = require('axios');


export class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            disable: true,
            emailError:'',
            passwordError:'',
            modal: false,
            loading: false,
            data: '',
            success: '',
            status_code: '',
            message: '',
            token:'',
            show_modal:'',
            redirect:''
        }
    }

    



    // handleEmail = (e) => {
    //     this.setState({
    //         email: e.target.value
    //     })
    // }

    // handlePassword = (e) => {
    //     this.setState({
    //         password: e.target.value
    //     })
    // }

    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value });
        this.validate();
     }

    validate = () => {
        let emailError = "";
        let passwordError = "";

        let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!reg.test(this.state.email)){
            emailError = 'Invalid Email , should be of format xyz@abc.com ';
        }

        if(!this.state.password){
            passwordError = 'password is required';
            // passwordError = 'min length of password should be 8';
        }

        if(emailError || passwordError){
            this.setState({ emailError , passwordError });
            return false;
        }

        return true;

    };

    handleSubmit = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if(isValid){
            console.log(this.state);
            const user = {
                email: this.state.email,
                pass: this.state.password
            };

            // axios.post('http://180.149.241.208:3022/login',user)
            // .then( res => console.log(res.data));


            this.setState({ loading: true }, () => {
                axios.post('http://180.149.241.208:3022/login',user)
                  .then(result => this.setState({
                    loading: false,
                    show_modal: false,
                    success: result.data.success,
                    status_code: result.data.status_code,
                    message: result.data.message,
                    token: result.data.token,
                    redirect: true
                  },console.log(result.data.error_message)))
                //   .catch(error => this.setState({
                //     loading: false,
                //     success: error.data.success,
                //     status_code: error.data.status_code,
                //     message: error.data.message
                //   },console.log(error.data.message)));
                  .catch(error =>
                     this.setState({
                      loading: false,
                      show_modal: true,
                      token: '',
                      success: '',
                      status_code: '',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
                      message: error.message
                  }))
                //  .catch(err => { console.log(err.error) })                  
              });

            // console.log(this.state);

            this.setState({
                email:'',
                password: '',
                emailError: '',
                passwordError: ''
            })
        }

    }

    handleToggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    handleEnter = () => {
        this.validate();
    }


    render() {
        
        const {
            buttonLabel,
            className
          } = this.props;

        return (
            <div>
            { this.state.token.length > 0 ? localStorage.setItem('token','bearer ' + this.state.token) : '' }    
            {this.state.redirect ? window.location.href = "/" : ''}    
            <Container className="App">
            {this.state.loading ?      
                <Loader
                    type="Oval"
                    color="#00BFFF"
                    height={500}
                    width={1200}
                    timeout={10000} 
                /> : '' 
            }
            { this.state.show_modal ? <Modal2 status={this.state.status_code} message={this.state.message} token={this.state.token}/> : '' }
                { this.state.loading ? '' : 
                    <Row className="section-login">
                        <Col>
                            <Row>
                                <button className="social-btn-1">
                                    <img src="https://img.icons8.com/material/24/000000/facebook--v1.png"></img>
                                    <span className="socialLogin">Login with Facebook</span>
                                </button>
                            </Row>
                            <Row>
                                <button className="social-btn-2">
                                    <img src="https://img.icons8.com/material/24/000000/google-logo.png"></img>
                                    <span className="socialLogin">Login with Google</span>
                                </button>
                            </Row>
                        </Col>
                        <Col>
                            <Card className="form-card">
                            <h2>Login to NeoSTORE</h2>
                                <Form className="form" onSubmit={this.handleSubmit}>
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
                                    <Label for="examplePassword">Password</Label>
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
                                <Button disabled={ this.state.email.length > 0 && this.state.password.length > 0 ? false : true }>Login</Button>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                }
                { this.state.loading ? '' :
                <div className="center section-login">
                    {/* <button className="btn-none"><Link to="/register" style={{ color: '#000' }}>Register Now</Link></button> */}
                    <Row>
                        <Col />
                        <Col><Button color="danger"><Link to="/register" style={{ color: '#fff'}}>Register</Link></Button></Col>
                        <Col><ModalExample buttonLabel="Forgot ?" /></Col>
                        <Col />
                    </Row>
                </div>
                }

            </Container>


            </div>
        )
    }
}

export default Login
