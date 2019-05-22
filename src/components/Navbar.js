import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import '../component-styles/navbar.css'

class Navbar extends Component {

    renderLogout = () => {
        const {user} = this.props;
        if(user){
            return(
                <button id="navbar-logout-btn" className='nav-link nav-item' onClick={this.handleLogout}>Logout</button>
            )
        }else{
            return(
                <NavLink className='nav-link nav-item' to='/login'>Login</NavLink>              
            )
        }
    }

    handleLogout = () => {
        axios.get('/api/login/logout').then((res) => {
            //change state so that navbar gets re-rendered with correct login/logout btns
            if(res.data.user === false){
                this.props.logoutUser()
            }
            this.props.history.push('/')
        });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to='/'>Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {/* exact so that the link is only highlightee when user is on home page and not on child */}
                        <NavLink exact className="nav-item nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                        <NavLink className="nav-item nav-link" to="/book">Book</NavLink>
                        <NavLink className='nav-item nav-link' to='/profile'>Profile</NavLink>
                        {this.renderLogout()}
                        {/* <NavLink className="nav-item nav-link disabled" href="#">Disabled</NavLink> */}
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        logoutUser: () => {dispatch({type: 'LOGOUT_USER'})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)