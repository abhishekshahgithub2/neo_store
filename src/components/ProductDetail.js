import React, { Component } from 'react'
import {domain} from '../urls/url';
import { Link } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import { Container, Row, Col } from 'reactstrap';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import '../App.css';
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";

import { SocialIcon } from 'react-social-icons';
import ModalExample from './ModalExample';


export class ProductDetail extends Component {

    constructor(props){
        super(props);

        this.state = {
            display: [],
            featured: '',
            tab: true
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

    changeTab1 = () => {
        this.setState({
            tab: true
        })
    }

    changeTab2 = () => {
        this.setState({
            tab: false
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
                        {display.map(item => 
                            <div className="mb">
                                <Row>
                                    <Col xs="6">
                                        <div>
                                            { this.state.featured === '' && <GlassMagnifier
                                                imageSrc={`${domain}/${item.product_image}`}
                                                imageAlt="Example"
                                                // className="detail-img"
                                                // largeImageSrc={`${domain}/${item.product_image}`} // Optional 
                                                /> }
                                            { this.state.featured && <GlassMagnifier
                                                imageSrc={`${domain}/${this.state.featured}`}
                                                imageAlt="Example"
                                                // className="detail-img"
                                                // largeImageSrc={`${domain}/${this.state.featured}`} // Optional 
                                                /> }    
                                            {/* {this.state.featured === '' && <img className="detail-img"  src={`${domain}/${item.product_image}`} />} */}
                                            {/* <img className="detail-img"  src={`${domain}/${item.product_image}`} /> */}
                                            {/* { this.state.featured && <img className="detail-img" src={`${domain}/${this.state.featured}`} />} */}

                                        </div> 
                                    </Col>
                                    <Col xs="6" className="pl-10">
                                        <Row>
                                            <div className="center">
                                                <h3>{item.product_name}</h3>
                                            </div>
                                        </Row>
                                        <Row>
                                            {/* <StarRatings
                                                rating={parseInt(item.product_rating)}
                                                starRatedColor="rgb(255, 165, 52)"
                                                //   changeRating={this.changeRating}
                                                numberOfStars={5}
                                                name='rating'
                                            /> */}
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
                                                    rating={parseFloat(item.product_rating)}
                                                    starRatedColor="rgb(255, 165, 52)"
                                                    //   changeRating={this.changeRating}
                                                    numberOfStars={5}
                                                    name='rating'
                                                    />
                                                    }
                                            </div>
                                        </Row>
                                        <hr/>
                                        <Row>
                                            <div className="center product_cost">
                                                Price : ₹ {item.product_cost}
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
                                            <Col xs="1.5"><button className="social-buttons"><SocialIcon network="facebook" /></button></Col>
                                            <Col xs="1.5"><button className="social-buttons"><SocialIcon network="google" /></button></Col>
                                            <Col xs="1.5"><button className="social-buttons"><SocialIcon network="whatsapp" /></button></Col>
                                            <Col xs="1.5"><button className="social-buttons"><SocialIcon network="pinterest" /></button></Col>
                                            <Col xs="1.5"><button className="social-buttons"><SocialIcon network="twitter" /></button></Col>
                                            <Col xs="2"></Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col xs='4'><Button color="danger">Add To Cart</Button></Col>
                                            {/* <Col xs='8'><Button color="primary">Rate Product</Button></Col> */}
                                            <Col xs='8'><ModalExample buttonLabel="Rate Product" rate="true"/></Col>
                                        </Row>
                                        <br/>
                                    </Col>
                                </Row>
                                <Row>
                                {
                                    item.subImages_id.product_subImages.map(item2 => 
                                        <div className="featured-sub-div">
                                            <img className="featured-sub-images" onClick={() => this.changeImage(item2)} src={`${domain}/${item2}`} />
                                        </div>    
                                    )
                                }
                                {/* <img src={`${domain}/${this.state.featured}`} /> */}
                                </Row>
                                <Row>
                                    <div className={this.state.tab ? 'tab-btn tab-active' : 'tab-btn'} onClick={this.changeTab1}>Description</div>
                                    <div className={!this.state.tab ? 'tab-btn tab-active' : 'tab-btn'} onClick={this.changeTab2}>Features</div>
                                    <hr/>
                                </Row>
                                <Row>
                                {this.state.tab ? <div><span className="features-text">{item.product_desc}</span></div> : 
                                    <div>
                                        <div className="features-text"><bold>Dimensions:</bold> {item.product_dimension}</div>
                                        <div className="features-text"><bold>Material:</bold> {item.product_material}</div>
                                        <div className="features-text"><bold>Manufacturer:</bold> {item.product_producer} </div>
                                    </div>
                                    }
                                </Row>
                            </div>
                        )}
                </Container> 
            </div>
        )
    }
}

export default ProductDetail
