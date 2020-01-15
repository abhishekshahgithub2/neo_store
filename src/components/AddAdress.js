import React, { Component } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {domain} from '../urls/url';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';


export class AddAdress extends Component {
    constructor(props){
        super(props);
        this.state = {
            address: '',
            pincode: '',
            city: '',
            state: '',
            country: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();

    //     const config = {     
    //         headers: { 'Authorization' : `${localStorage.getItem('token')}`,'Accept': 'application/json' }
    //     }



    //     const value = {
    //         address: this.state.address,
    //         pincode: this.state.pincode,
    //         city: this.state.city,
    //         state: this.state.state,
    //         country: this.state.country
    //     }

    //     axios.post(`${domain}/address`,value, { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
    //         .then(response => console.log(response))
    // }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <div>
                            <h4>Add a new address</h4>
                        </div>
                    </Row>
                    <Row>
                        <Col xs='4'>
                        </Col>
                        <Col xs='8'>
                            <Formik
                                initialValues={{
                                    address: '',
                                    pincode: '',
                                    city: '',
                                    state: '',
                                    country: ''
                                    // state: '',
                                    // country: ''
                                }}
                                validationSchema={Yup.object().shape({  
                                    address: Yup.string()
                                    .min(0, 'Address must be at least 0 characters')
                                    .required('Address is required'),
                                    pincode: Yup.string()
                                        .min(0, 'pincode must be at least 0 characters')
                                        .required('pincode is required'),  
                                    city: Yup.string()
                                        .min(0, 'city must be at least 0 characters')
                                        .required('city is required'),  
                                    state: Yup.string()
                                        .min(0, 'State must be at least 0 characters')
                                        .required('State is required'), 
                                    country: Yup.string()
                                        .min(0, 'Country must be at least 0 characters')
                                        .required('Country is required'),                               
                                    // state: Yup.string()
                                    //     .min(0, 'state must be at least 0 characters')
                                    //     .required('state is required'), 
                                    // country: Yup.string()
                                    //     .min(0, 'country must be at least 0 characters')
                                    //     .required('country is required'),    
            
                                })}
                                onSubmit={fields => {
                                    alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 6) + JSON.stringify(fields.state))
                                                    const value = {
                                                        address: JSON.stringify(fields.address).slice(1,-1),
                                                        pincode: JSON.stringify(fields.pincode).slice(1,-1),
                                                        city: JSON.stringify(fields.city).slice(1,-1),
                                                        state: JSON.stringify(fields.state).slice(1,-1),
                                                        country: JSON.stringify(fields.country).slice(1,-1)
                                                        // state: JSON.stringify(fields.state).slice(-1,1),
                                                        // country: JSON.stringify(fields.country).slice(-1,1)
                                                    }
                                            axios.post(`${domain}/address`,value, { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
                                                    .then(response => console.log(response))
                                            }
                                }
                                render={({ errors, status, touched }) => (
                                    // <Form onSubmit={this.handleSubmit}>
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="address">Address</label>
                                            <Field name="address" type="text" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
                                            <ErrorMessage name="address" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pincode">Pincode</label>
                                            <Field name="pincode" type="text" className={'form-control' + (errors.pincode && touched.pincode ? ' is-invalid' : '')} />
                                            <ErrorMessage name="pincode" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="city">City</label>
                                            <Field name="city" type="text" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} />
                                            <ErrorMessage name="city" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="state">State</label>
                                            <Field name="state" type="text" className={'form-control' + (errors.state && touched.state ? ' is-invalid' : '')} />
                                            <ErrorMessage name="state" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="country">Country</label>
                                            <Field name="country" type="text" className={'form-control' + (errors.country && touched.country ? ' is-invalid' : '')} />
                                            <ErrorMessage name="country" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary mr-2">Add Address</button>
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

export default AddAdress
