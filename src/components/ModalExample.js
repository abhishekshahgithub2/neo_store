import React, { Component }  from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../App.css';

import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Row , Card
  } from 'reactstrap';

import StarRatings from 'react-star-ratings';

import {domain} from '../urls/url';

import axios from 'axios';

axios.defaults.headers.common = {
    'Authorization': localStorage.getItem('token')
};

export class ModalExample extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            email: '',
            emailError: '',
            rating: 0
        }
    }

    handleModal = (e) => {
        this.setState({
            modal: !this.state.modal
        })
    }

    handleChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if(isValid){
            console.log(this.state.email);
            this.setState({
                email:'',
                emailError: '',
                modal: !this.state.modal
            })
        }
    }

    submitRating = () => {
        let url = window.location.href;
        let id = url.substring(url.lastIndexOf('/') + 1);
        console.log(id);

        const value = {
            product_id: id,
            product_rating: this.state.rating
        };

        console.log('Rating :' + this.state.rating + 'Product id' + id );

        const config = {     
            headers: { 'content-type': 'multipart/form-data' , 'Authorization' : `${localStorage.getItem('token')}`,'Accept': 'application/json' }
        }
        
        axios.put(`${domain}/updateProductRatingByCustomer`, value , { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
            .then(response => console.log(response))
            // .then(response => response.json())
            // .then(data => console.log(data))
        
        let formData = new FormData();
        formData.append('product_id', id); 
        formData.append('product_rating', this.state.rating);

        // { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} }
        
        // axios.put(`${domain}/updateProductRatingProdId`, formData, config)
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });

        this.setState({
            modal: !this.state.modal
        })


    }

    changeRating = ( newRating, name ) => {
        this.setState({
          rating: newRating
        });
      }

    validate = () => {
        let emailError = "";

        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!re.test(this.state.email)){
            emailError = 'Invalid Email , should be of format xyz@abc.com ';
        }


        if(emailError){
            this.setState({ emailError });
            return false;
        }

        return true;

    };


    render() {

        const { buttonLabel, className} = this.props;


        return (
            <div>
                <Form className="form">
                    <Button color="danger" onClick={this.handleModal}>{buttonLabel}</Button>
                    <Modal isOpen={this.state.modal} fade={false} toggle={this.handleModal} className={className}>
                    <ModalHeader toggle={this.handleModal}>{this.props.rate ? 'Rate Product' : 'Recover Password' }</ModalHeader>
                                <ModalBody>
                                    <Card className="form-card">
                                                    <Col>
                                                        <Form className="form">
                                                            <FormGroup>

                                                                { this.props.rate ? '' : 
                                                                <div>

                                                                <Label>Email</Label>
                                                                <Input
                                                                    name="email"
                                                                    type="text" 
                                                                    placeholder="Email Address" 
                                                                    value={this.state.email} 
                                                                    onChange={this.handleChange} 
                                                                    />
                                                            
                                                                {this.state.emailError ? (<div style={{ fontSize: 12 , color: "red"}}>{this.state.emailError}</div>) : null }
                                                                </div>
                                                                }

                                                                { this.props.rate ?                 
                                                                <StarRatings
                                                                    rating={this.state.rating}
                                                                    starRatedColor="rgb(255, 165, 52)"
                                                                    changeRating={this.changeRating}
                                                                    numberOfStars={5}
                                                                    name='rating'
                                                                /> : ''

                                                                }

                                                            </FormGroup>
                                                        </Form>    
                                                    </Col>
                                    </Card>
                                </ModalBody>
                    <ModalFooter>
                                                                                       
                        {/* {
                            this.props.rate ?        
                            <StarRatings
                                rating={this.state.rating}
                                starRatedColor="blue"
                                changeRating={this.changeRating}
                                numberOfStars={5}
                                name='rating'
                            /> : ''
                        } */}
                        {
                            this.props.rate ? <Button onClick={this.submitRating} disabled={ this.state.rating !== 0 ? false : true}> Done </Button> :
                            <Button color="primary" onClick={this.handleSubmit} disabled={ this.state.email.length > 0 ? false : true }>Submit</Button>
                        }
                    </ModalFooter>
                    </Modal>
                </Form>
            </div>
        )
    }
}

export default ModalExample