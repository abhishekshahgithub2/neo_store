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
            modal: false,
            email: '',
            emailError: ''
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
                    <ModalHeader toggle={this.handleModal}>Recover Password</ModalHeader>
                                <ModalBody>
                                    <Card className="form-card">
                                                    <Col>
                                                        <Form className="form">
                                                            <FormGroup>
                                                                <Label>Email</Label>
                                                                <Input
                                                                    name="email"
                                                                    type="text" 
                                                                    placeholder="Email Address" 
                                                                    value={this.state.email} 
                                                                    onChange={this.handleChange} 
                                                                    />
                                                            
                                                                {this.state.emailError ? (<div style={{ fontSize: 12 , color: "red"}}>{this.state.emailError}</div>) : null }
                                                            </FormGroup>
                                                        </Form>    
                                                    </Col>
                                    </Card>
                                </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSubmit} disabled={ this.state.email.length > 0 ? false : true }>Submit</Button>{' '}
                    </ModalFooter>
                    </Modal>
                </Form>
            </div>
        )
    }
}

export default ModalExample


// const ModalExample = (props) => {
//   const {
//     buttonLabel,
//     className
//   } = props;

//   const [modal, setModal] = useState(false);

//   const [email, setEmail] = useState('');

//   const [emailError, setEmailError] = useState('');

//   const toggle = () => setModal(!modal);
  
// //   const validate = () => {
// //     let emailError = "";

// //     if(!this.state.email.includes('@')){
// //         emailError = 'invalid Email';
// //     }

// //     if(emailError){
// //         setEmailError({ emailError});
// //         return false;
// //     }

// //     return true;

// //     };

//             // handleSubmit = (e) => {
//             //     e.preventDefault();
//             //     // const isValid = this.validate();
//             //     // if(isValid){
//             //     //     console.log(this.state);
//             //     //     setEmail('');
//             //     //     setEmailError('');
//             //     console.log(email);
//             // }


//   return (
//     <div>
//       <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
//       <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
//         <ModalHeader toggle={toggle}>Recover Password</ModalHeader>
//                     <ModalBody>
//                         <Card className="form-card">
//                                     <Form className="form">
//                                     <Col>
//                                         <Form className="form">
//                                             <FormGroup>
//                                                 <Label>Email</Label>
//                                                 <Input
//                                                     name="email"
//                                                     type="text" 
//                                                     placeholder="Email Address" 
//                                                     value={email} 
//                                                     onChange={e => setEmail(e.target.value)} 
//                                                 />
//                                                 {/* {emailError ? (<div style={{ fontSize: 12 , color: "red"}}>{emailError}</div>) : null } */}
//                                             </FormGroup>
//                                         </Form>    
//                                     </Col>
//                                     </Form>
//                         </Card>
//                     </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={toggle}>Submit</Button>{' '}
//           {/* <Button color="secondary" onClick={toggle}>Cancel</Button> */}
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// }

// export default ModalExample;