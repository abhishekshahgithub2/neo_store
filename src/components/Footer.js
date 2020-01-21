import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import '../App.css';
import {domain} from '../urls/url';
import { Link } from "react-router-dom";

export class Footer extends Component {
    constructor(props){
        super(props);
    }

    sub = () => {
        const { history } = this.props;
        if(history) history.push(`${domain}/subscriber`);
    }

    terms = () => {
        window.open(`${domain}/2019-06-28T06-10-29.263ZTerms_and_Conditions.pdf`, '_blank');
        window.location.reload(true);
    }

    guarantee = () => {
        window.open(`${domain}/2019-06-28T06-11-38.277ZGuarantee_ReturnPolicy.pdf`, '_blank');
        window.location.reload(true);  
    }

    render() {
        return (
            <div className="footer">
                <Container>
                    <Row>
                        <Col><h5>About Company</h5></Col>
                        <Col><h5>Information</h5></Col>
                        <Col><h5>Newsletter</h5></Col>
                    </Row>
                    <Row>
                        <Col><p>NeoSOFT Technologies is here at your quick and easy service for</p></Col>
                        <Col><p className="grab" onClick={this.terms}>Terms and Conditions</p></Col>
                        <Col><p>Signup to get exclusive offer from our favorite brands and to be</p></Col>
                    </Row>
                    <Row>
                        <Col><p>shopping .</p></Col>
                        <Col><p className="grab" onClick={this.guarantee}>Gurantee and Return Policy</p></Col>
                        <Col><p>well up in the news</p></Col>
                    </Row>
                    <Row>
                        <Col><p>Contact information</p></Col>
                        <Col><p><Link to="/contactus" style={{color:'#fff'}}>Contact Us</Link></p></Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col><p>Email: contact@neosofttech.com</p></Col>
                        <Col><p>Privacy Policy</p></Col>
                        <Col>
                            <div >
                                <input className="subinput" type="text" placeholder="your email..."/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col><p>Phone</p></Col>
                        <Col><p>Locate Us</p></Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col><p>MUMBAI, INDIA</p></Col>
                        <Col></Col>
                        <Col>
                            <div className="subdiv">
                                <Link to="/subscriber"><button className="sub" onClick={this.sub}>Subscribe</button></Link>
                            </div>
                        </Col>
                    </Row>
                    <p>Copyright 2017 NeoSOFT Technologies All rights reserved | Design By </p>
                </Container>
            </div>
        )
    }
}

export default Footer
