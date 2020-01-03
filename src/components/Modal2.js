import React, { Component }  from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../App.css';

import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Row , Card
  } from 'reactstrap';


export class ModalExample extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: true,
            email: '',
            emailError: '',
            display: true
        }
    }

    handleModal = (e) => {
        this.setState({
            modal: !this.state.modal
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
            this.setState({
                email:'',
                emailError: '',
                modal: !this.state.modal,
                display: !this.state.display
            })
        
        window.location.reload(true);
    }

    render() {

        const { buttonLabel, className} = this.props;


        return (
            <div>
                <Form className="form" style={{ display : this.state.display ? 'block' : 'none'}}>
                
                    <Button color="none" onClick={this.handleModal}>{buttonLabel}</Button>
                    <Modal isOpen={this.state.modal} fade={false} toggle={this.handleModal} className={className}>
                    <ModalHeader toggle={this.handleModal}>Status</ModalHeader>
                                <ModalBody>
                                    <Card className="form-card">
                                                    <Col>
                                                        <Form className="form">
                                                            <FormGroup>
                                                                <Label><h5>Invalid Username or Password</h5></Label>
                                                            {/* {this.state.display ? 'true' : 'false'} */}
                                                                <div>{this.props.message}</div>
                                                                <div>{this.props.token}</div>
                                                                {/* <Label>Email</Label> */}
                                                            </FormGroup>
                                                        </Form>    
                                                    </Col>
                                    </Card>
                                </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.handleSubmit}>Close</Button>{' '}
                    </ModalFooter>
                    </Modal>
                </Form>
            </div>
        )
    }
}

export default ModalExample
