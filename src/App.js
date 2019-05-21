import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home.js';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Book from './components/Book.js';
import Register from './components/Register.js'
import './App.css';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* render navbar on every page */}
          <Route path='/' component={Navbar}></Route> 
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}></Route>
          <Route path='/book' component={Book}></Route>
          <Route path='/register' component={Register}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
