import React, { Component } from 'react'
import '../App.css'
import { Container, Row, Col } from 'reactstrap';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

import ReactStars from 'react-rating-stars-component'
import StarRating from 'react-star-rating'
import StarRatings from 'react-star-ratings';

import {domain} from '../urls/url';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            display: [],
        };
    }

    componentDidMount(){
        fetch(`${domain}/defaultTopRatingProduct`)
        .then(response => response.json())
        .then(data => this.setState({ display: data.product_details }));
    }

    notify = () => toast("Product added to cart !");
    test = (item2) => { this.props.addToCart(item2)  }


    render() {
        const { display } = this.state;
        return (
            
            <div className="section1">
                <h3 className="center">Popular Products</h3>
                <p className="center"><Link style={{ color: '#000' }}to="/products">View All</Link></p>
                <Container>
                {display.map(item =>
                    <div className="matCard">
                        {item.DashboardProducts.map(item2=>
                            <div className="card1">
                                <div className="center">
                                    <img className="test" src={`${domain}/${item2.product_image}`} />
                                </div>
                                <div className="center product_name">
                                    <Link to={`/productDetail/${item2._id}`}>{item2.product_name}</Link>
                                </div>
                                <div className="center product_cost">
                                    <bold>₹ {item2.product_cost}</bold>
                                </div>
                                <div className="center">
                                    {/* <button className="card-btn" onClick={() => this.props.addToCart(item2)}>Add To Cart</button> */}
                                    <button className="card-btn" onClick={()=>this.test(item2)}>Add To Cart</button>
                                    <ToastContainer />
                                </div>
                                <div className="center">
                                    {isNaN(item2.product_rating) ? 
                                            <StarRatings
                                            rating={0}
                                            starRatedColor="rgb(255, 165, 52)"
                                        //   changeRating={this.changeRating}
                                            numberOfStars={5}
                                            name='rating'
                                        /> : 
                                        <StarRatings
                                        rating={parseFloat(item2.product_rating)}
                                        starRatedColor="rgb(255, 165, 52)"
                                      //   changeRating={this.changeRating}
                                        numberOfStars={5}
                                        name='rating'
                                      />
                                        }
                                    
                                </div>
                            </div>    
                            )}
                            {/* <button className="card-btn" onClick={() => this.props.addToCart(item)}>Add To Cart</button> */}
                    </div>
                    
                )}
                {/* { this.props.items.map(item=>console.log(item.product_id)) } */}
                </Container>
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

export default connect(mapStateToProps,mapDispatchToProps)(Home)
