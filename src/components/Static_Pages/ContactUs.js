import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import {domain} from '../../urls/url';
import '../../App.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export class ContactUs extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            subject: '',
            phone_no: '',
            message: ''
        }

        const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/ ;

    }

    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    }

    render() {
        return (
            <div className="contact-top">
                <div className="c-form">
    
                    <div className="center">
                        <h3>Contact Form</h3>
                        <hr />   
                    </div>   

                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            phone_no: '',
                            subject: '',
                            message: ''
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string()
                                .min(3, 'Name must be atleast 3 characters')
                                .required('Name is required'),
                            email: Yup.string()
                                .email('Email is invalid')
                                .required('Email is required'), 
                                
                            phone_no: Yup.string()
                                    .matches(/^[0-9]*$/, 'Phone number is not valid')
                                    .min(10, '10 digit number is required')
                                    .max(10, '10 digits number is required') 
                                    .required('Phone No is required'),   
                            subject: Yup.string()
                                    .min(3, 'Name must be atleast 3 characters')
                                    .required('Subject is required'),  
                            message: Yup.string()
                                    .min(3, 'Name must be atleast 3 characters')
                                    .required('Message is required')
                        })}
                        onSubmit={fields => {
                            alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 8))
                                            const value = {
                                                name: JSON.stringify(fields.name).slice(1,-1),
                                                email: JSON.stringify(fields.email).slice(1,-1),
                                                phone_no: JSON.stringify(fields.phone_no),
                                                subject: JSON.stringify(fields.subject).slice(1,-1),
                                                message: JSON.stringify(fields.message).slice(1,-1)
                                            }
                                    axios.post(`${domain}/contactUs`,value, { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
                                            .then(response => console.log(response.message))
                                    }
                                }
                        render={({ errors, status, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone_no">Phone no</label>
                                    <Field name="phone_no" type="text" className={'form-control' + (errors.phone_no && touched.phone_no ? ' is-invalid' : '')} />
                                    <ErrorMessage name="phone_no" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <Field name="subject" type="text" className={'form-control' + (errors.subject && touched.subject ? ' is-invalid' : '')} />
                                    <ErrorMessage name="subject" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <Field name="message" type="text" className={'form-control' + (errors.message && touched.message ? ' is-invalid' : '')} />
                                    <ErrorMessage name="message" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                </div>
                            </Form>
                        )}
                    />
                    </div>

            </div>
        )
    }
}

export default ContactUs
