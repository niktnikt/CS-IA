import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios';
import {connect} from 'react-redux';

class Login extends Component {

    state = {
        error: null,
        email: '',
        password: ''
    }

    handleChange = (field, e) => {
        //bind in onchage event swaps the order of arguments so event is second
        this.setState({
            [field]: e.target.value
        })
    }

    renderError = () => {
        if(this.state.error){
            return <p>{this.state.error}</p>
        }
    }

    submitForm = (e) => {
        e.preventDefault()
        axios.post('/api/login', {
            email: this.state.email,
            password: this.state.password
        }).then((res) => {
            if(res.data.user){
                this.props.fetchUser(res.data.user)
                this.props.history.push('/profile')
            }
        })
    }

    render() {
        return (
            <div id="login">

                <form onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label htmlFor="login-email">Email address</label>
                        <input onChange={this.handleChange.bind(this, 'email')} type="email" className="form-control" id="login-email" placeholder="Enter email" value={this.state.email}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">Password</label>
                        <input onChange={this.handleChange.bind(this, 'password')} type="password" className="form-control" id="login-password" placeholder="Password" value={this.state.password}/>
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                    {this.renderError()}
                </form>

                <p>Don't have an account?</p>
                <Link to='/register' className='btn btn-primary'>Register</Link>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetchUser: (user) => { dispatch({ type: 'GET_USER', user: user }) }
    }
  }

export default connect(null, mapDispatchToProps)(Login);