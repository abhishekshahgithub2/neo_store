import React, { Component } from 'react';
import '../../App.css';
import handShake from '../../assets/images/handshake.jpg';

export class Subscriber extends Component {
    render() {
        return (
            <div>
                <div className="text-img">
                    <h5 className="center">Thank You</h5>
                    <h5 className="center">For Subscribing</h5> 
                </div>
               <img className="thankImage center" src={handShake} />
            </div>
        )
    }
}

export default Subscriber
