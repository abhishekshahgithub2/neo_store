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
// import Profile from './components/Profile';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class App extends Component {
  render() {
    return (
      // <div>
      //   <Header />
      //   <Democarousel />
      //   <Home />
      //   <Footer />
      // </div>
          <Router>
            <div>      
              <Header/>
                <Switch>
                  <Route exact path="/">
                    <Democarousel />
                    <Home />
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
                  {/* <Route path="/profile">
                    <Profile />
                  </Route> */}
                </Switch>
              <Footer/>
            </div>
          </Router>
    )
  }
}

export default App;
