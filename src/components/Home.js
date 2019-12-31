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

    render() {
        const { display } = this.state;
        return (
            
            <div className="section1">
                <h3 className="center">Popular Products</h3>
                <p className="center">View All</p>
                <Container>
                {display.map(item =>
                    <div className="matCard">
                        {item.DashboardProducts.map(item2=>
                            <div className="card1">
                                <div className="center">
                                    <img className="test" src={`${domain}/${item2.product_image}`} />
                                </div>
                                <div className="center product_name">
                                    {item2.product_name}
                                </div>
                                <div className="center product_cost">
                                    <bold>₹ {item2.product_cost}</bold>
                                </div>
                                <div className="center">
                                    <button className="card-btn">Add To Cart</button>
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
                                        rating={parseInt(item2.product_rating)}
                                        starRatedColor="rgb(255, 165, 52)"
                                      //   changeRating={this.changeRating}
                                        numberOfStars={5}
                                        name='rating'
                                      />
                                        }
                                    
                                </div>
                            </div>    
                            )}
                    </div>
                )}
                </Container>

                {/* <Container>
                    <Row>
                        <Col xs="3">
                            <Card>
                                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                <CardBody>
                                <CardTitle>Card title</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Add To Cart</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="3">
                            <Card>
                                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                <CardBody>
                                <CardTitle>Card title</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Add To Cart</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="3">
                            <Card>
                                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                <CardBody>
                                <CardTitle>Card title</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Add To Cart</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="3">
                            <Card>
                                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                                <CardBody>
                                <CardTitle>Card title</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Add To Cart</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container> */}
            </div>
        )
    }
}

export default Home
