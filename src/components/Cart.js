import React, { Component } from 'react'
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, Row , Card
  } from 'reactstrap';
import cartImg from '../../src/assets/images/emptycart.png'  

import { Link } from "react-router-dom";
import {connect} from 'react-redux';

import { Table } from 'reactstrap';

import {domain} from '../urls/url';

import { CardHeader, CardFooter, CardBody,
    CardTitle, CardText } from 'reactstrap';


export class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            SubTotal: 0,
            Gst: 0,
            OrderTotal: 0,
            quantity: 1
        }
    }

    proceedBuy = () => {
        // alert('Please Login First');
    }

    incQuantity = () => {
        if(this.state.quantity === 9){
            alert("Maximum limit reached");
        }
        if(this.state.quantity < 9){
            this.setState({
                quantity: this.state.quantity + 1
            })
        }
    }

    decQuantity = () => {
        if(this.state.quantity > 1) {
            this.setState({
                quantity: this.state.quantity - 1
            })
        }
    }

    render() {
        // const renderCart = this.props.items.map((item,index) => 
        //     <div>
        //          {item.product_cost}
        //          {item.product_name}
        //          by {item.product_producer}
        //          {item.product_stock > 0 ? 'In Stock' : '' }
        //          <button onClick={()=>this.props.removeFromCart(index)}>Delete</button>
        //     </div>
        //     )  
            

        return (
            <div>
                <div className="test-container">
                    <div className="five">1 Cart</div>
                    <div className="heading1"></div>
                    <div className="ten"> &nbsp; &nbsp; 2 Delivery Address</div>
                </div>
                {this.props.items.length === 0 ? 
                <div>
                    <Container>
                        <Col xs="12">
                            <div className="center marg-btm">
                                <img className="emptyCart" src={cartImg} />
                                <h6>YOUR CART IS CURRENTLY EMPTY</h6>
                                <p>Before proceed to checkout you must add some products to you shopping cart.</p>
                                <p>You will find lots of intresting products on our products page</p>
                                <Button color="primary"><Link style={{ color: '#fff'}}to="/products">Return to Product Page</Link></Button>
                            </div>
                        </Col>
                    </Container>
                </div>
                 : 
                <Container>
                    <Row>
                        <Col xs="8">
                            <Table responsive className="t-shadow">
                                <thead>
                                    <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    {/* <th>Total</th> */}
                                    <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                { this.props.items.map((item,index) => 

                                    <tr>
                                        <td>
                                            <Row>
                                                <Col xs='3'>
                                                    <div>
                                                        <img className="mini-image" src={`${domain}/${item.product_image}`} />
                                                    </div>   
                                                </Col> 
                                                <Col xs='9'>
                                                    <div>{item.product_name}</div>
                                                    <div>by {item.product_producer}</div>
                                                    <div> Status: <span className="status">{item.product_stock > 0 ? 'In Stock' : '' }</span></div>
                                                </Col>
                                            </Row>
                                        </td>
                                        <td>
                                            <div className="counter_qty">
                                                <button className="qty_btn" onClick={this.incQuantity}>+</button>
                                                    &nbsp; <span className="instance">{this.state.quantity}</span> &nbsp;
                                                <button className="qty_btn" onClick={this.decQuantity}>-</button>
                                            </div>
                                        </td>
                                        <td>
                                            {item.product_cost}
                                        </td>
                                        {/* <td>
                                            Total
                                        </td> */}
                                        <td>
                                            <button onClick={()=>this.props.removeFromCart(index)}><i class="fa fa-trash" aria-hidden="true"></i></button>
                                        </td>
                                        
                                    </tr>
                                    )}
                                    {/* { this.props.items.map(item=>console.log(item.product_id)) } */}
                                </tbody>
                                </Table> 
                        </Col>
                        <Col xs="4">
                            <Card>
                                <CardHeader className="center">Review Order</CardHeader>
                                <CardBody>
                                    <div>SubTotal: { this.props.items.reduce((accu,curr)=>{ return accu += curr.product_cost * this.state.quantity },0) }</div><hr/>
                                    <div>GST (5%): { this.props.items.reduce((accu,curr)=>{ return accu = accu + curr.product_cost * 0.05 * this.state.quantity },0) }</div><hr/>
                                    <div>Order Total: { this.props.items.reduce((accu,curr)=>{ return accu = (accu + curr.product_cost + curr.product_cost * 0.05) * this.state.quantity },0) } </div><hr/>
                                    <Button onClick={this.proceedBuy} color="primary width-100">{ localStorage.getItem('token') ? 'Proceed To Buy' :<Link to="/login" style={{ color: '#000' }}>Proceed To Buy</Link> }</Button>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    </Container>
                    }
            </div>
            
        )
    }
}

function mapStateToProps(state){
    return {
        items: state.cart
    }
}

function mapDispatchToProps(dispatch){
    return {
        addToCart: (item) => {
            dispatch({
                type:'ADD_TO_CART',
                item
            })
        },
        removeFromCart: (index) => {
            dispatch({
                type:'REMOVE_FROM_CART',
                index
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)
