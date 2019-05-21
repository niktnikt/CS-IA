import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom'

class Navbar extends Component {
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
                        <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                        {/* <NavLink className="nav-item nav-link disabled" href="#">Disabled</NavLink> */}
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar