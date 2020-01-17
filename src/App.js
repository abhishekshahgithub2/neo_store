import React , {Component} from 'react';
import './App.css';
import Header from './components/Header';
import Democarousel from './components/Democarousel';
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Order from './components/Order';
import Products from './components/Products';
import Forgot from './components/Forgot';
import Logout from './components/Logout';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Address from './components/Address';
import ChangePassword from './components/ChangePassword';
import AddAddress from './components/AddAdress';
import EditAddress from './components/EditAddress';
import Product from './components/Product';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchText: ''
    }
  }

  handleSearch = (Stext) => {
    this.setState({
      searchText: Stext
    })
  }

  render() {
    return (
          <Router>
            <div>      
              <Header handleSearch={this.handleSearch}/>
                <Switch>
                  <Route exact path="/">
                    <Democarousel />
                    <Home test={this.state.searchText}/>
                  </Route>
                  <Route path="/login">
                    <Login/>
                  </Route>
                  <Route path="/register">
                    <Register />
                  </Route>
                  <Route path="/order">
                    
                    { localStorage.getItem('token') ? <Order /> : <Login /> }

                  </Route>
                  <Route path="/products">
                    <Products />
                  </Route>
                  <Route path="/forgot">
                    <Forgot />
                  </Route>
                  <Route path="/logout">
                    <Logout />
                  </Route>
                  <Route path="/ProductDetail/:id">
                      <ProductDetail />
                  </Route>
                  <Route path="/cart">
                      <Cart />
                  </Route>
                  <Route path="/profile">
                    <Profile />
                  </Route>
                  <Route path="/address">
                    <Address />
                  </Route>
                  <Route path="/changepassword">
                    <ChangePassword />
                  </Route>
                  <Route path="/addaddress">
                    <AddAddress />
                  </Route>
                  <Route path="/editaddress/:id">
                      <EditAddress />
                  </Route>
                  <Route path="/product">
                      <Product />
                  </Route>
                </Switch>
              <Footer/>
            </div>
          </Router>
    )
  }
}

export default App;
