import React, { Component } from 'react'
import '../component-styles/home.css';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className='bg-primary text-white' id="home">
                <div>
                    <h1>Home page</h1>
                    <Link className="text-white btn btn-danger" id='home-book-btn' to='/book'>Book an event</Link>
                </div>

            </div>
        )
    }
}

export default Home;
