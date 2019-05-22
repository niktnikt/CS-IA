import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Register extends Component {

    state = {
        email: '',
        password: '',
        confirmPassword: '',
        error: null
    }

    handleChange = (field, e) => {
        //bind in onchage event swaps the order of arguments so event is second
        this.setState({
            [field]: e.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                error: 'Passwords not matching'
            })
        } else {
            axios.post('/api/register', {
                email: this.state.email,
                password: this.state.password
            }).then((res) => {
                if (res.data.success) {
                    this.props.history.push('/profile')
                    this.props.fetchUser(res.data.user)
                } else if (res.data.error) {
                    this.setState({
                        error: res.data.error
                    })
                }
            })
        }
    }

    renderError = () => {
        if (this.state.error) {
            return <p className='text-danger'>{this.state.error}</p>
        }
    }

    render() {
        return (
            <div id="register">
                <h1>registre page</h1>
                <form onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label htmlFor="register-email">Email address</label>
                        <input onChange={this.handleChange.bind(this, 'email')} type="email" className="form-control" id="register-email" placeholder="Enter email" value={this.state.email} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-password">Password</label>
                        <input onChange={this.handleChange.bind(this, 'password')} type="password" className="form-control" id="register-password" placeholder="Password" value={this.state.password} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-confirm-password">Password</label>
                        <input onChange={this.handleChange.bind(this, 'confirmPassword')} type="password" className="form-control" id="register-confirm-password" placeholder="Confirm Password" value={this.state.confirmPassword} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    {this.renderError()}
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: (user) => { dispatch({ type: 'GET_USER', user: user }) }
    }
}

export default connect(null, mapDispatchToProps)(Register);