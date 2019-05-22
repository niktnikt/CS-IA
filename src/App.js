import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home.js';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Book from './components/Book.js';
import Register from './components/Register.js';
import Profile from './components/Profile/Profile.js'
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount(){
    //fetch user
    axios.get('/api').then((res) => {
      const user = res.data.user;
      this.props.fetchUser(user)
    })
  }

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
          <Route path='/profile' component={Profile}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (user) => { dispatch({ type: 'GET_USER', user: user }) }
  }
}

export default connect(null, mapDispatchToProps)(App);
