import React, { Component } from 'react'
import {domain} from '../urls/url';
import { Link } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import { Container, Row, Col } from 'reactstrap';
import '../App.css';

export class ProductDetail extends Component {

    constructor(props){
        super(props);

        this.state = {
            display: [],
            featured: ''
        }
    }

    componentDidMount(){
        let url = window.location.href;
        let id = url.substring(url.lastIndexOf('/') + 1);
        fetch(`${domain}/getProductByProdId/${id}`)
        .then(response => response.json())
        .then(data => this.setState({ display: data.product_details}));
    }

    changeImage = (item2) => {
        this.setState({
            featured: item2
        })
    }

    render() {
        const {display} = this.state;
        return (
            <div>
                {/* { display.map(item=>
                        <div>
                                                <div className="card2">
                        <div className="center">
                            <img className="test" src={`${domain}/${item.product_image}`} />
                        </div>
                        <div className="center product_name">
                            {item.product_name}
                        </div>
                        <div className="center product_cost">
                            <bold>₹ {item.product_cost}</bold>
                        </div>
                        <div className="center">
                            <button className="card-btn">Add To Cart</button>
                        </div>
                        <div>   
                            {item.product_desc}
                            Dimension   {item.product_desc}
                            Material    {item.product_material}
                            Manufacturer    {item.producer}
                        </div>    
                        <div className="center">
                        {isNaN(item.product_rating) ? 
                                <StarRatings
                                rating={0}
                                starRatedColor="rgb(255, 165, 52)"
                            //   changeRating={this.changeRating}
                                numberOfStars={5}
                                name='rating'
                            /> : 
                            <StarRatings
                            rating={parseInt(item.product_rating)}
                            starRatedColor="rgb(255, 165, 52)"
                            //   changeRating={this.changeRating}
                            numberOfStars={5}
                            name='rating'
                            />
                            }
                    </div>
                    </div>
                            {
                            item.subImages_id.product_subImages.map(item2 => 
                                <div>
                                    <img className="test" src={`${domain}/${item2}`} />

                                </div>    
                            )
                            }
                    </div>  
                )}  */}
                <Container>
                    <Row>
                        {display.map(item => 
                            <div>
                                <Row>
                                    <Col xs="8">
                                        <div>
                                            {this.state.featured === '' && <img className="detail-img"  src={`${domain}/${item.product_image}`} />}
                                            {/* <img className="detail-img"  src={`${domain}/${item.product_image}`} /> */}
                                            { this.state.featured && <img src={`${domain}/${this.state.featured}`} />}

                                        </div> 
                                    </Col>
                                    <Col xs="4">
                                        <Row>
                                            <div className="center product_name">
                                                {item.product_name}
                                            </div>
                                        </Row>
                                        <Row>
                                            <StarRatings
                                                rating={parseInt(item.product_rating)}
                                                starRatedColor="rgb(255, 165, 52)"
                                                //   changeRating={this.changeRating}
                                                numberOfStars={5}
                                                name='rating'
                                            />
                                        </Row>
                                        <hr/>
                                        <Row>
                                            <div className="center product_cost">
                                                <bold>Price : ₹ {item.product_cost}</bold>
                                            </div>
                                        </Row>
                                        <Row>
                                            Color : &nbsp; <button style={{ backgroundColor: item.color_id.color_name }} className="color-btn">  </button>
                                        </Row>
                                        <br/>
                                        <Row>
                                            Share  &nbsp; &nbsp; <img src="https://img.icons8.com/android/24/000000/share.png"></img>
                                        </Row>
                                        <Row>
                                            <Col xs="2"></Col>
                                            <Col xs="2"></Col>
                                            <Col xs="2"></Col>
                                            <Col xs="2"></Col>
                                            <Col xs="2"></Col>
                                            <Col xs="2"></Col>
                                        </Row>
                                        <Row>
                                            <Col xs='6'><button>Add To Cart</button></Col>
                                            <Col xs='6'><button>Rate Product</button></Col>
                                        </Row>
                                        <br/>
                                    </Col>
                                </Row>
                                <Row>
                                {
                                    item.subImages_id.product_subImages.map(item2 => 
                                        <div>
                                            <img onClick={() => this.changeImage(item2)} className="test" src={`${domain}/${item2}`} />
                                        </div>    
                                    )
                                }
                                {/* <img src={`${domain}/${this.state.featured}`} /> */}
                                </Row>
                            </div>
                        )}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ProductDetail
