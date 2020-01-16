import React, { Component } from 'react'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


import '../App.css';

import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {connect} from 'react-redux';
import {domain} from '../urls/url';
import axios from 'axios';
import defProfile from "../assets/images/profile-placeholder.png";

// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const StyledBadge = withStyles(theme => ({
    badge: {
      right: -1,
      top: 0,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      background: 'red'
    },
  }))(Badge);

export class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            clicked: false,
            dropdownOpen: false,
            search: '',
            profile_img: ''
        }
    }

    componentDidMount(){
        const config = {     
            headers: { 'Authorization' : `${localStorage.getItem('token')}`,'Accept': 'application/json' }
        }

        axios.get(`${domain}/getCustProfile`,{ headers: {"Authorization" : `${localStorage.getItem('token')}`} })
        .then(response => this.setState({
            image: response.data.customer_proile.profile_img
        }))

    }

    handleClick = () => {
        this.setState({
            clicked: !this.state.clicked
        })
    }

    setOpen = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    removeToken = () => {
        localStorage.removeItem('token');
        // localStorage.removeItem('cart');
        // window.location.reload();
    }

    render() {
        return (
            <div className="topbar">
                
                    <span className="store-text">Neo<span className="store">STORE</span></span>
                    
                    <span className="nav1">
                        <button id="navBtn"><Link to="/" style={{ color: '#FFF' }}>Home</Link></button>
                        <button id="navBtn"><Link to="/products" style={{ color: '#FFF' }}>Products</Link></button>
                        <button id="navBtn"><Link to="/order" style={{ color: '#FFF' }}>Order</Link></button>
                    </span>

                    <input id="search" placeholder="Search..." type="text" autoComplete="off" className="inputtop"/>
                    {/* <Autocomplete
                        className="inputtop"
                        options={top100Films}
                        getOptionLabel={option => option.title}
                        // style={{ width: 300 }}
                        renderInput={params => (
                            <TextField {...params} variant="outlined" fullWidth />
                        )}
                    /> */}
                    <Link to="/cart" style={{ color: '#000' }}>
                    <button id="btn1">
                        <IconButton aria-label="cart">
                            <StyledBadge badgeContent={this.props.items.length ? this.props.items.length : 0 } color="primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>								
                            </StyledBadge>
                        </IconButton>
                        Cart &nbsp; </button>
                    </Link>    
                    {/* <button id="btn1" onClick={this.handleClick}><i class="material-icons">account_box</i>
                        <button className="expandmore" >
                            <i class="material-icons">expand_more</i>
                        </button>
                        { this.state.clicked && 
                        <div className="dropdown">
                                <button className="drop_btn">Login</button>
                                <button className="drop_btn">Register</button>
                        </div>
                        }
                    </button> */}
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.setOpen}>
                        <DropdownToggle className="drop" >
                            <button className="button-2" onClick={this.handleClick}> { localStorage.getItem('token') ? <img className="header-profile" src={this.state.image ? `${domain}/${this.state.image}` : defProfile }/> : <i className="material-icons">account_box</i> } 
                                <button className="expandmore" >
                                    <i className="material-icons">expand_more</i>
                                </button>
                            </button>
                        </DropdownToggle>
                        <DropdownMenu>
                            { localStorage.getItem('token') ? '' : <DropdownItem><Link to="/login" style={{ color: '#000' }}>Login</Link></DropdownItem> }
                                {/* <DropdownItem divider /> */}
                            { localStorage.getItem('token') ? '' : <DropdownItem><Link to="/register" style={{ color: '#000' }}>Register</Link></DropdownItem> }
                            { localStorage.getItem('token') ? <DropdownItem><Link to="/profile" style={{ color: '#000' }} >Profile</Link></DropdownItem> : '' }  
                            { localStorage.getItem('token') ? <DropdownItem><Link to="/logout" style={{ color: '#000' }} onClick={this.removeToken}>Logout</Link></DropdownItem> : '' }                          
                        </DropdownMenu>
                    </ButtonDropdown>
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        items: state.cart
    }
}

export default connect(mapStateToProps)(Header)
