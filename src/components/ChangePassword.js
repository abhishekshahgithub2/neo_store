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
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export class ChangePassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            url_id: '',
            oldpassword: '',
            password: '',
            confirmPassword: ''
        }
    }

    componentDidMount(){

        let url = window.location.href;
        let id_url = url.substring(url.lastIndexOf('/') + 1);

        this.setState({
            url_id: id_url
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const config = {     
            headers: { 'Authorization' : `${localStorage.getItem('token')}`,'Accept': 'application/json' }
        }



        const value = {
            oldPass: this.state.oldpassword,
            newPass: this.state.password,
            confirmPass: this.state.confirmPassword
        }

        axios.post(`${domain}/changePassword`,value, { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
            .then(response => console.log(response.message))
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
                            <h4>Change Password</h4>
                            <hr/>

                        <Formik
                            initialValues={{
                                // firstName: '',
                                // lastName: '',
                                // email: '',
                                oldpassword: '',
                                password: '',
                                confirmPassword: ''
                            }}
                            validationSchema={Yup.object().shape({
                                // firstName: Yup.string()
                                //     .required('First Name is required'),
                                // lastName: Yup.string()
                                //     .required('Last Name is required'),
                                // email: Yup.string()
                                //     .email('Email is invalid')
                                //     .required('Email is required'),
                                oldpassword: Yup.string()
                                    .required('Old Password is required'),    
                                password: Yup.string()
                                    .min(6, 'Password must be at least 6 characters')
                                    .required('Password is required'),
                                confirmPassword:  Yup.string()
                                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                                    .required('Confirm Password is required')
                            })}
                            // onSubmit={fields => {
                            //     // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))

                            //     const config = {     
                            //         headers: { 'Authorization' : `${localStorage.getItem('token')}`,'Accept': 'application/json' }
                            //     }

                            //     console.log(JSON.stringify(fields.oldpassword));


                            //     const value = {
                            //         oldPass: JSON.stringify(fields.oldpassword),
                            //         newPass: JSON.stringify(fields.password),
                            //         confirmPass: JSON.stringify(fields.confirmPassword)
                            //     }

                            //     axios.post(`${domain}/changePassword`,value, { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
                            //         .then(response => console.log(response.message))
                            //     // alert('Initial Values:' + JSON.stringify(fields.oldpassword) + JSON.stringify(fields.password) + JSON.stringify(fields.confirmPassword))
                            // }}
                            render={({ errors, status, touched }) => (
                                <Form onSubmit={this.handleSubmit}>
                                    {/* <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                        <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                        <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div> */}
                                    <div className="form-group">
                                        <label htmlFor="oldpassword">Old Password</label>
                                        {/* <Field name="oldpassword" type="password" className={'form-control' + (errors.oldpassword && touched.password ? ' is-invalid' : '')} /> */}
                                        <input name="oldpassword" type="password" className={'form-control' + (errors.oldpassword && touched.password ? ' is-invalid' : '')} value={this.state.oldpassword} onChange={this.handleChange} />
                                        <ErrorMessage name="oldpassword" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">New Password</label>
                                        {/* <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} /> */}
                                        <input name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} value={this.state.password} onChange={this.handleChange} />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        {/* <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} /> */}
                                        <input name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} value={this.state.confirmPassword} onChange={this.handleChange} />
                                        <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary mr-2">Register</button>
                                        <button type="reset" className="btn btn-secondary">Reset</button>
                                    </div>
                                </Form>
                            )}
                        />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ChangePassword
