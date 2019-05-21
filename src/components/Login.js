import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios';

class Login extends Component{

    componentDidMount(){
        axios.get('/api').then((res) => {
            console.log(res)
        })
    }

    render(){
        return(
            <div id="login">
                <p>Don't have an account?</p>
                <Link to='/register' className='btn btn-primary'>Register</Link>
            </div>
        )
    }
}

export default Login;