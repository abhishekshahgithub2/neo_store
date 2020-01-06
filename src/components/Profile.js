import React, { Component } from 'react'
import {domain} from '../urls/url';
import axios from 'axios';


export class Profile extends Component {
    constructor(props){
        super(props);

    }
    
    componentDidMount(){
        // fetch(`${domain}/getCustProfile`, {
        //     credentials: 'include',
        //     headers: {
        //       'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //       'Access-Control-Allow-Origin':*
        //     }
        //   })

        // .then(response => response.json())
        // .then(data => console.log(data))
        // .then(console.log('success'))

        // const AuthStr = 'Bearer '.concat(localStorage.getItem('token')); 
        // axios.get(`${domain}/getCustProfile`, { headers: { Authorization: AuthStr } })
        // .then(response => {
        //     // If request is good...
        //     console.log(response.data);
        // })
        // .catch((error) => {
        //     console.log('error ' + error);
        // });
    }

    render() {
        return (
            <div>
                Profile
            </div>
        )
    }
}

export default Profile
