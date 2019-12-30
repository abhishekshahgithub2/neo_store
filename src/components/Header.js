import React, { Component } from 'react'
import '../App.css';

import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
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
    render() {
        return (
            <div className="topbar">
                
                    <span className="store-text">Neo<span className="store">STORE</span></span>
                    
                    <span className="nav1">
                        <button id="navBtn">Home</button>
                        <button id="navBtn">Products</button>
                        <button id="navBtn">Order</button>
                    </span>

                    <input id="search" placeholder="Search..." type="text" autoComplete="off" class="inputtop"/>
                    <button id="btn1">
                        <IconButton aria-label="cart">
                            <StyledBadge badgeContent={4} color="primary">
                                {/* <ShoppingCartIcon /> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>								
                            </StyledBadge>
                        </IconButton>
                        Cart</button>
                    <button id="btn1"><i class="material-icons">account_box</i>
                        <button className="expandmore">
                            <i class="material-icons">expand_more</i>
                        </button>
                    </button>
                
            </div>
        )
    }
}

export default Header
