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


        console.log(this.state.oldpassword + this.state.password + this.state.confirmPassword)
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
                        <Col xs='8' className="prof-box">
                            <h4>Change Password</h4>
                            <hr/>

                            <Formik
                                initialValues={{
                                    // firstName: '',
                                    // lastName: '',
                                    oldPass: '',
                                    newPass: '',
                                    confirmPass: ''
                                }}
                                validationSchema={Yup.object().shape({
                                    // firstName: Yup.string()
                                    //     .required('First Name is required'),
                                    // lastName: Yup.string()
                                    //     .required('Last Name is required'),
                                    oldPass: Yup.string()
                                        .min(6, 'Old Password must be at least 6 characters')
                                        .required('Password is required'),
                                    newPass: Yup.string()
                                        .min(6, 'Password must be at least 6 characters')
                                        .required('Password is required'),
                                    confirmPass:  Yup.string()
                                        .oneOf([Yup.ref('newPass'), null], 'Passwords must match')
                                        .required('Confirm Password is required')
                                })}
                                onSubmit={fields => {
                                    alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                                                    const value = {
                                                        oldPass: JSON.stringify(fields.oldPass).slice(1,-1),
                                                        newPass: JSON.stringify(fields.newPass).slice(1,-1),
                                                        confirmPass: JSON.stringify(fields.confirmPass).slice(1,-1)
                                                    }
                                            axios.post(`${domain}/changePassword`,value, { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
                                                    .then(response => console.log(response.message))
                                            }
                                        }
                                render={({ errors, status, touched }) => (
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="oldPass">Old Password</label>
                                            <Field name="oldPass" type="password" className={'form-control' + (errors.oldPass && touched.oldPass ? ' is-invalid' : '')} />
                                            <ErrorMessage name="oldPass" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="newPass">newPass</label>
                                            <Field name="newPass" type="password" className={'form-control' + (errors.newPass && touched.newPass ? ' is-invalid' : '')} />
                                            <ErrorMessage name="newPass" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="confirmPass">Confirm Password</label>
                                            <Field name="confirmPass" type="password" className={'form-control' + (errors.confirmPass && touched.confirmPass ? ' is-invalid' : '')} />
                                            <ErrorMessage name="confirmPass" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary mr-2">Change Password</button>
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











// export class ChangePassword extends Component {
//    constructor(props){
//          super(props);
//          this.state = {
//              url_id: '',
//              oldpassword: '',
//              password: '',
//              confirmPassword: ''
//          }
//      }

//      componentDidMount(){

//          let url = window.location.href;
//          let id_url = url.substring(url.lastIndexOf('/') + 1);

//          this.setState({
//              url_id: id_url
//          })
//      }
//     render() {
//         return (
//             <Formik
//                 initialValues={{
//                     // firstName: '',
//                     // lastName: '',
//                     oldPass: '',
//                     newPass: '',
//                     confirmPass: ''
//                 }}
//                 validationSchema={Yup.object().shape({
//                     // firstName: Yup.string()
//                     //     .required('First Name is required'),
//                     // lastName: Yup.string()
//                     //     .required('Last Name is required'),
//                     oldPass: Yup.string()
//                         .min(6, 'Old Password must be at least 6 characters')
//                         .required('Password is required'),
//                     newPass: Yup.string()
//                         .min(6, 'Password must be at least 6 characters')
//                         .required('Password is required'),
//                     confirmPass:  Yup.string()
//                         .oneOf([Yup.ref('newPass'), null], 'Passwords must match')
//                         .required('Confirm Password is required')
//                 })}
//                 onSubmit={fields => {
//                     alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
//                                      const value = {
//                                          oldPass: JSON.stringify(fields.oldPass).slice(1,-1),
//                                          newPass: JSON.stringify(fields.newPass).slice(1,-1),
//                                          confirmPass: JSON.stringify(fields.confirmPass).slice(1,-1)
//                                      }
//                             axios.post(`${domain}/changePassword`,value, { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
//                                     .then(response => console.log(response.message))
//                             }
//                         }
//                 render={({ errors, status, touched }) => (
//                     <Form>
//                         <div className="form-group">
//                             <label htmlFor="oldPass">Old Password</label>
//                             <Field name="oldPass" type="password" className={'form-control' + (errors.oldPass && touched.oldPass ? ' is-invalid' : '')} />
//                             <ErrorMessage name="oldPass" component="div" className="invalid-feedback" />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="newPass">newPass</label>
//                             <Field name="newPass" type="password" className={'form-control' + (errors.newPass && touched.newPass ? ' is-invalid' : '')} />
//                             <ErrorMessage name="newPass" component="div" className="invalid-feedback" />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="confirmPass">Confirm Password</label>
//                             <Field name="confirmPass" type="password" className={'form-control' + (errors.confirmPass && touched.confirmPass ? ' is-invalid' : '')} />
//                             <ErrorMessage name="confirmPass" component="div" className="invalid-feedback" />
//                         </div>
//                         <div className="form-group">
//                             <button type="submit" className="btn btn-primary mr-2">Register</button>
//                             <button type="reset" className="btn btn-secondary">Reset</button>
//                         </div>
//                     </Form>
//                 )}
//             />
//         )
//     }
// }

// export default ChangePassword
