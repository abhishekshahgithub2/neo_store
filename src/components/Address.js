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
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


export class Address extends Component {
    constructor(props){
        super(props);
        this.state = {
            url_id: '',
            address: [],
            edit: false,
            address_id: '',
            address_instance: '',
            city: '',
            pincode: '',
            country: '',
            state: ''
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

    editable = (address_id1,address1,city1,pincode1,country1,state1) => {
        this.setState({
            edit: !this.state.edit,
            address_id:address_id1,
            address_instance:address1,
            city:city1,
            pincode:pincode1,
            country:country1,
            state:state1
        })
        // window.location = `/editaddress/${item}`;
    }

    deleteAddress = (id) => {
        const value = {
                address_id: id
            }
        axios.delete(`${domain}/deladdress/${id}`,value, { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
            .then(response => console.log(response))
            .then(window.location = '/address')
    }
    
    render() {
        return (
            <div>


                {this.state.edit ? 
                        <div>
                           Edit Address Code  
                           {
                               <div>
                                    <div>{this.state.address_id}</div>
                                    {/* <div>{this.state.address_instance}</div>
                                    <div>{this.state.city}</div>
                                    <div>{this.state.pincode}</div>
                                    <div>{this.state.country}</div>
                                    <div>{this.state.state}</div> */}
                               

                                <Formik
                                initialValues={{
                                    address: this.state.address_instance,
                                    pincode: this.state.pincode,
                                    city: this.state.city,
                                    state: this.state.state,
                                    country: this.state.country
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
                                        .min(0, 'Stat must be at least 0 characters')
                                        .required('Stat is required'), 
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
                                                        address_id: this.state.address_id,
                                                        address: JSON.stringify(fields.address).slice(1,-1),
                                                        pincode: JSON.stringify(fields.pincode),
                                                        city: JSON.stringify(fields.city).slice(1,-1),
                                                        state: JSON.stringify(fields.state).slice(1,-1),
                                                        country: JSON.stringify(fields.country).slice(1,-1)
                                                        // state: JSON.stringify(fields.state).slice(-1,1),
                                                        // country: JSON.stringify(fields.country).slice(-1,1)
                                                    }
                                            axios.put(`${domain}/updateAddress`,value, { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
                                                    .then(response => console.log(response))
                                                    .then(window.location = '/address')
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
                                            <Field name="pincode" type="number" className={'form-control' + (errors.pincode && touched.pincode ? ' is-invalid' : '')} />
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
                                            <button type="submit" className="btn btn-primary mr-2">Edit Address</button>
                                            <button type="reset" className="btn btn-secondary">Reset</button>
                                        </div>
                                    </Form>
                                )}
                                />
                                </div>
                           }   
                        </div>    
                        :
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
                                                    {item.address_id}
                                                    <div>{item.address}</div> 
                                                    <div>{item.city}  </div> 
                                                    <div>{item.pincode}</div>
                                                    <div>{item.country}</div>
                                                    <div>{item.state}</div>
                                                    <Button onClick={()=>this.deleteAddress(item.address_id)}>Delete</Button>
                                                    <Button onClick={()=>this.editable(item.address_id,item.address,item.city,item.pincode,item.country,item.state)} color="primary">Edit</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}
                                    <Button><Link style={{color: '#000'}}to="/addaddress">Add Address</Link></Button>
                            </Col>
                        </Row>
                    </Container>
                }


                {/* <Container>
                    <Row>My Account</Row>
                    <hr/>
                    <Row>
                        <Col xs='4'>
                            <ProfileCard url_id={this.state.url_id}/>
                        </Col>
                        <Col xs='8' className="prof-box">
                            {this.state.edit ? 'editable' : 'not editable'}
                            <h4>Addresses</h4>
                            <hr/>
                                {this.state.address.map((item,index)=>  
                                    <div key={index}>
                                        <Row>
                                            <Col xs='12' className="prof-mini">
                                                {item.address_id}
                                                <div>{item.address}</div> 
                                                <div>{item.city}  </div> 
                                                <div>{item.pincode}</div>
                                                <div>{item.country}</div>
                                                <Button onClick={()=>this.editable(item.address_id)} color="primary">Edit</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                )}
                                <Button><Link style={{color: '#000'}}to="/addaddress">Add Address</Link></Button>
                        </Col>
                    </Row>
                </Container> */}
            </div>
        )
    }
}

export default Address
