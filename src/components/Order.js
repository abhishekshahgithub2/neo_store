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

export class Order extends Component {
    constructor(props){
        super(props);
        this.state = {
            url_id: '',
            orders: [],
            receipt: ''
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
        
        axios.get(`${domain}/getOrderDetails`,{ headers: {"Authorization" : `${localStorage.getItem('token')}`} })
            // .then(response => console.log(response.data.product_details))
            .then(response => this.setState({orders: response.data.product_details}))


    }

    next = () => {
        window.open(`${domain}/${this.state.receipt}`, '_blank');
        window.location.reload(true);
    }

    invoice = (item,itemId) => {
        // console.log(itemId);

        axios.post(`${domain}/getInvoiceOfOrder`, item ,{ headers: {"Authorization" : `${localStorage.getItem('token')}`} })
        // .then(response => console.log(response.data.product_details))
        // .then(response => console.log(response.data.receipt))
        .then(response =>  this.setState({receipt: response.data.receipt}))

        // .then(window.open(`${domain}/${this.state.receipt}`, '_blank'))
        // .then(window.location.reload(true))
        // .then(this.next());
    }



    render() {
        return (
            <div>
                <Container>
                    <Row>My Account {this.state.receipt !== '' ? this.next() :'' }</Row>
                    <hr/>
                    <Row>
                        <Col xs='4'>
                            <ProfileCard url_id={this.state.url_id}/>
                        </Col>
                        <Col xs='8'>
                            <h4>Orders</h4>
                            <hr/>
                                {this.state.orders.length > 0 ? 
                                    this.state.orders.map(item => 
                                        <div>
                                            <Container className="orders-box">
                                                <Row>
                                                    <span className="transit">TRANSIT &nbsp;</span> Order By : {item._id}
                                                </Row>
                                                <Row>
                                                    Placed On: <span className="date">{item.product_details[0].createdAt}</span> / <span className="status"> &nbsp;₹ {item.product_details[0].total_cartCost} </span>  
                                                </Row>
                                                <hr/>
                                                <Row>
                                                    {item.product_details.map((item2,index2)=>
                                                        <div> 
                                                            <div>{item2.product_details.map((item3,index)=>
                                                                <div>{<img className="test" src={`${domain}/${item3.product_image}`} />}</div>
                                                            )}</div>
                                                        </div>
                                                    )}
                                                </Row>
                                                <hr/>
                                                <Button color="primary" onClick={()=>this.invoice(item,item._id)}>Download Invoice as PDF</Button>
                                            </Container>
                                        </div>
                                        )
                                    :
                                    'EMPTY'
                                }
                                {/* {
                                    this.state.orders.map(item => 
                                        <div>
                                            <Container className="orders-box">
                                                <Row>
                                                    <span className="transit">TRANSIT &nbsp;</span> Order By : {item._id}
                                                </Row>
                                                <Row>
                                                    Placed On: <span className="date">{item.product_details[0].createdAt}</span> / <span className="status"> &nbsp;₹ {item.product_details[0].total_cartCost} </span>  
                                                </Row>
                                                <hr/>
                                                <Row>
                                                    {item.product_details.map((item2,index2)=>
                                                        <div> 
                                                            <div>{item2.product_details.map((item3,index)=>
                                                                <div>{<img className="test" src={`${domain}/${item3.product_image}`} />}</div>
                                                            )}</div>
                                                        </div>
                                                    )}
                                                </Row>
                                                <hr/>
                                                <Button color="primary" onClick={()=>this.invoice(item,item._id)}>Download Invoice as PDF</Button>
                                            </Container>
                                        </div>
                                        )
                                } */}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Order
