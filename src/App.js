import React , {Component} from 'react';
import './App.css';
import Header from './components/Header';
import Democarousel from './components/Democarousel';
import Home from './components/Home';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Democarousel />
        <Home />
        <Footer />
      </div>
    )
  }
}

export default App;
