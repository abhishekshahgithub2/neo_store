import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

import {domain} from '../urls/url';
import StarRatings from 'react-star-ratings';
import '../App.css';
import axios from 'axios'
import { Link } from "react-router-dom";
import productDetail from '../components/ProductDetail';

import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


export class Products extends Component {

    constructor(props){
        super(props);
        this.state = {
            display: [],
            categories: [],
            colors: [],
            show: false,
            showColor: false,
            no_products: '',
            cat_selcted: false,
            id_cat:'',
            currentPage: 1,
            displayPerPage: 9
        };
    }

    componentDidMount(){
        fetch(`${domain}/getAllProducts`)
        .then(response => response.json())
        .then(data => this.setState({ display: data.product_details }));

        fetch(`${domain}/getAllCategories`)
        .then(response => response.json())
        .then(data => this.setState({ categories: data.category_details }));

        fetch(`${domain}/getAllColors`)
        .then( response => response.json())
        .then(data => this.setState({ colors: data.color_details}));

    }

    setOpen = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    toggleShow = () => {
        this.setState({
            show: !this.state.show
        })
    }

    toggleColor = () => {
        this.setState({
            showColor: !this.state.showColor
        })
    }

    ascending = () => {
        fetch(`${domain}/getAllProductsInAscending`)
        .then( response => response.json())
        .then(data => this.setState({ display: data.product_details}));
    }

    descending = () => {
        fetch(`${domain}/getAllProductsInDescending`)
        .then(response => response.json())
        .then( data => this.setState({display: data.product_details }));
    }

    sortByRating = () => {
        fetch(`${domain}/getAllProductsInHighestRating`)
        .then(response => response.json())
        .then(data=>this.setState({display: data.product_details}))
    }

    sortCat = (item) => {
        fetch(`${domain}/getProductByCateg/${item}`)
        .then(response => response.json())
        .then(data=>this.setState({display: data.product_details,cat_selcted:true,id_cat:item}))
    }

    sortByCatColor = (category_id,color_id) => {
        fetch(`${domain}/getProductByColor/${category_id}/${color_id}`)
        .then(response => response.json())
        .then(data=>this.setState({display: data.product_details,cat_selcted:false}))
    }

    sortByColor = (id) => {
        // fetch(`${domain}/getProductBycolor/${id}`)
        // .then(response => response.json())
        // .then(data=>this.setState({display: data.product_details}),
        // console.log('success'))
        // .catch(error => console.log("the error is", error)
        // , console.log('Errors')
        // );
        // if(this.state.cat_selcted){
        //     axios 

        //     .get(`${domain}/getProductBycolor/${category_id}/${color_id}`)
        //     .then(response => {
        //         console.log(response.data.product_details);
        //         if(response.data.product_details === 'No details are available')
        //         {
        //             this.setState({
        //                 no_products: 'NO PRODUCT FOUND'
        //             })
        //         }
        //         else {
        //             this.setState({ display: response.data.product_details,
        //                             no_products: ''    
        //             });       
        //         }
        //         // this.setState({ display: response.data.product_details });
        //       })
        //     .catch(error => console.log(error));   
        //     // this.sortByCatColor(this.state.id_cat,id);       
        // }

        // else {
            axios 

            .get(`${domain}/getProductBycolor/${id}`)
            .then(response => {
                console.log(response.data.product_details);
                if(response.data.product_details === 'No details are available')
                {
                    this.setState({
                        no_products: 'NO PRODUCT FOUND'
                    })
                }
                else {
                    this.setState({ display: response.data.product_details,
                                    no_products: ''    
                    });       
                }
                // this.setState({ display: response.data.product_details });
              })
            .catch(error => console.log(error));
        // }

    }

    allProduct = () => {
        fetch(`${domain}/getAllProducts`)
        .then(response => response.json())
        .then(data => this.setState({ display: data.product_details }));
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    handleClick = (event) => {
        this.setState({
          currentPage: Number(event.target.id)
        });
    }


    render() {
        const { display , currentPage, displayPerPage } = this.state;

        const indexOfLastDisplay = currentPage * displayPerPage;
        const indexOfFirstDisplay = indexOfLastDisplay - displayPerPage;
        const currentDisplay = display.slice(indexOfFirstDisplay, indexOfLastDisplay);

        const renderDisplay = currentDisplay.map(item=> 
            <div>{item.product_name}</div>
            );
        
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(display.length / displayPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
              <div
                key={number}
                id={number}
                onClick={this.handleClick}
                className="pag2"
              >
                {number}
              </div>
            );
          });


        return (
            <div>
                <Container>
                    <Row>
                        <Col xs='3'>
                            <div className="custom-drop"><h6 onClick={this.allProduct} className="p5">All Products</h6></div>
                            <div onClick={this.toggleShow} className="custom-drop"><p className="align-left p5"><i className="material-icons middle-align">expand_more</i>Categories</p></div>
                                <div>
                                    { this.state.show && this.state.categories.map(item => <div>

                                        <div className="center cat_l" onClick={()=>this.sortCat(item._id)}>
                                            {item.category_name}
                                            <hr/> 
                                        </div>
                                    </div>)}
                                </div>
                            <div onClick={this.toggleColor} className="custom-drop"><p className="align-left p5"><i className="material-icons middle-align">expand_more</i>Color</p></div>
                            <Row>
                                
                                    { this.state.showColor && this.state.colors.map(item => 
                                    <Col xs='4'> 
                                        <div>
                                             <button onClick={() => this.sortByColor(item._id)} style={{ backgroundColor: item.color_name }} className="color-btn">  </button>
                                        </div>
                                    </Col>
                                    )}
                                
                            </Row>
                        </Col>
                        <Col xs='9'>
                            <Row>
                                <Col xs='8'>All Categories</Col>
                                <Col xs='4'>Sort by :
                                    <button onClick={this.sortByRating} className="btn_sorting"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></button>
                                    <button onClick={this.descending} className="btn_sorting"><img src="https://img.icons8.com/material-sharp/24/000000/rupee.png" /><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg></button>
                                    <button onClick={this.ascending} className="btn_sorting"><img src="https://img.icons8.com/material-sharp/24/000000/rupee.png" /><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#010101" d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/></svg></button> 
                                </Col>
                            </Row>
                            <Row>

                            {   this.state.no_products &&
                                <div >
                                    <img src="https://dlinkmea.com/images/no-product.png" />
                                </div>
                            }

                            {this.state.no_products === '' && currentDisplay.map(item=>
                                <div className="card2">
                                    <div className="center">
                                        <img className="test" src={`${domain}/${item.product_image}`} />
                                    </div>
                                    <div className="center product_name">
                                        <Link to={`/productDetail/${item._id}`}>{item.product_name}</Link>
                                    </div>
                                    <div className="center product_cost">
                                        <bold>₹ {item.product_cost}</bold>
                                    </div>
                                    <div className="center">
                                        <button className="card-btn">Add To Cart</button>
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
                                )}                               
                            </Row>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col xs="5"></Col>
                        {/* <Col xs="7">
                            {                
                                <ul id="pagination">
                                    {renderPageNumbers}
                                </ul>
                            }  */}
                            <ul>
                            {pageNumbers.map(number => {
                                return (
                                <div
                                    key={number}
                                    id={number}
                                    onClick={this.handleClick}
                                    className="pag2"
                                >
                                    {number}
                                </div>
                                );
                            })}
                            </ul>
                        {/* </Col> */}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Products
