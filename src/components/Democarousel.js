import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import '../App.css';

export class Democarousel extends Component {
    constructor(props){
        super(props);
        this.state = {
            hits: [],
        };
    }

    componentDidMount(){
        fetch('http://180.149.241.208:3022/getAllCategories')
        .then(response => response.json())
        .then(data => this.setState({ hits: data.category_details }));
    }

    render() {
        const { hits } = this.state;
        return (
            <div>
                <Carousel>
                {hits.map(hit =>
                    <div>
                        <img src={`http://180.149.241.208:3022/${hit.product_image}`} />
                    </div>
                )}
                </Carousel>
            </div>
        )
    }
}

export default Democarousel
