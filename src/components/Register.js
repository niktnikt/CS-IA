import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Register extends Component {

    state = {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        surname: '',
        city: '',
        street: '',
        number: '',
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
                password: this.state.password,
                name: this.state.name,
                surname: this.state.surname,
                city: this.state.city,
                street: this.state.street,
                number: this.state.number
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
                        <label htmlFor="register-name">Name</label>
                        <input onChange={this.handleChange.bind(this, 'name')} type="text" className="form-control" id="register-name" placeholder="Name" value={this.state.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-surname">Surname</label>
                        <input onChange={this.handleChange.bind(this, 'surname')} type="text" className="form-control" id="register-surname" placeholder="Surname" value={this.state.surname} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-email">Email address</label>
                        <input onChange={this.handleChange.bind(this, 'email')} type="email" className="form-control" id="register-email" placeholder="Enter email" value={this.state.email} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-city">
                        <label htmlFor="register-city">City</label>
                        <input onChange={this.handleChange.bind(this, 'city')} type="text" className="form-control" id="register-city" placeholder="City" value={this.state.city} />
                    </div>
                    <div className="form-street">
                        <label htmlFor="register-street">Street</label>
                        <input onChange={this.handleChange.bind(this, 'street')} type="text" className="form-control" id="register-street" placeholder="Street" value={this.state.street} />
                    </div>
                    <div className="form-number">
                        <label htmlFor="register-street">Street Number</label>
                        <input onChange={this.handleChange.bind(this, 'number')} type="text" className="form-control" id="register-number" placeholder="Street Number" value={this.state.number} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-password">Password</label>
                        <input onChange={this.handleChange.bind(this, 'password')} type="password" className="form-control" id="register-password" placeholder="Password" value={this.state.password} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-confirm-password">Confirm Password</label>
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