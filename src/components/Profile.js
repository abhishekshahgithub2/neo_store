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
import DatePicker from 'react-date-picker';

// import DatePicker from "react-datepicker";
 
// import "react-datepicker/dist/react-datepicker.css";

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
            profile_img: '',
            url_id: '',
            edit: false
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
                profile_img: response.data.customer_proile.profile_img
            }))
  
        this.convert(this.state.dob);    
    }

    edit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    handleChange = (e) => {
        this.setState({
            dob: e.target.value
        })
    }

    handleChange2 = date => {
        this.setState({
            dob: date
        });
    };

    convert = (str) => {
        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        this.setState({dob:[date.getFullYear(), mnth, day].join("-")}) ;
    }

    handleGender = (e) => {
        this.setState({
            gender: e.target.value
        })
    }

    onChange = (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        
        reader.onload = (e) => {
            console.warn("Image data",e.target.result)
            this.setState({
                profile_img: e.target.result
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.edit ? 
                <div>
                    <Container>
                    <Row>
                        
                    <Col xs='4'>
                        <h4 className="center">Edit Profile</h4>  
                        <ProfileCard url_id={this.state.url_id}/>  
                    </Col>
                    <Col cs='8' className="prof-box">                            
                        <Formik
                            initialValues={{
                                first_name: this.state.first_name,
                                last_name: this.state.last_name,
                                email: this.state.email,
                                gender: this.state.gender,
                                phone_no: this.state.phone_no,
                                dob: this.state.dob
                            }}
                            validationSchema={Yup.object().shape({
                                first_name: Yup.string()
                                    .required('First Name is required'),
                                last_name: Yup.string()
                                    .required('Last Name is required'),
                                email: Yup.string()
                                    .email('Email is invalid')
                                    .required('Email is required'),
                                gender: Yup.string()
                                    .required('Gender is required'),
                                phone_no: Yup.string()
                                    .required('Gender is required'),
                                dob: Yup.string()    
                                    .required('Date of Birth is required')
                            })}
                            onSubmit={fields => {
                                alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))

                                const value = {
                                    first_name: JSON.stringify(fields.first_name).slice(1,-1),
                                    last_name: JSON.stringify(fields.last_name).slice(1,-1),
                                    email: JSON.stringify(fields.email).slice(1,-1),
                                    gender: this.state.gender,
                                    phone_no: JSON.stringify(fields.phone_no).slice(1,-1),
                                    dob: this.state.dob,
                                    profile_img: this.state.profile_img
                                    // state: JSON.stringify(fields.state).slice(-1,1),
                                    // country: JSON.stringify(fields.country).slice(-1,1)
                                }
                                
                                axios.put(`${domain}/profile`,value, { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
                                    .then(response => console.log(response))
                                    .then(window.location = '/profile')
                                
                            }}
                            render={({ errors, status, touched }) => (
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="first_name">First Name</label>
                                        <Field name="first_name" type="text" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} />
                                        <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="last_name">Last Name</label>
                                        <Field name="last_name" type="text" className={'form-control' + (errors.last_name && touched.last_name ? ' is-invalid' : '')} />
                                        <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="gender">gender</label>
                                        <div onChange={this.handleGender}>
                                            <input type="radio" value="Male" name="gender" checked={this.state.gender === 'Male' ? 'checked': ''}/> Male
                                            <input type="radio" value="Female" name="gender" checked={this.state.gender === 'Female' ? 'checked': ''}/> Female
                                        </div>
                                        {/* <Field name="gender" type="text" className={'form-control' + (errors.gender && touched.gender ? ' is-invalid' : '')} />
                                        <ErrorMessage name="gender" component="div" className="invalid-feedback" /> */}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone_no">phone_no</label>
                                        <Field name="phone_no" type="number" className={'form-control' + (errors.phone_no && touched.phone_no ? ' is-invalid' : '')} />
                                        <ErrorMessage name="phone_no" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="dob">Date of Birth &nbsp; </label>
                                        <input name="dob" type="date" value={this.state.dob} onChange={this.handleChange}/>
                                        {/* <Field name="dob" type="text" className={'form-control' + (errors.dob && touched.dob ? ' is-invalid' : '')} /> */}
                                        <ErrorMessage name="dob" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="m-5-topbtm">
                                        <input type="file" name="file" onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary mr-2">Edit Profile</button>
                                    </div>
                                </Form>
                            )}
                        />
                    </Col>
                    </Row>
                    </Container>
                </div>    
                 : 
                <div>
                    <Container>
                        <Row>My Account</Row>
                        <hr/>
                        <Row>
                            <Col xs='4'>
                                <ProfileCard url_id={this.state.url_id}/>

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
                                <Button onClick={this.edit} color="primary">Edit</Button>                              
                            </Col>
                        </Row>
                    </Container>
                </div>    
                }
            </div>
        )
    }
}

export default Profile
