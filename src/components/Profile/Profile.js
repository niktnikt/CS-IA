import React, { Component } from 'react'
import { connect } from 'react-redux';
import Loader from '../Loader';
import Admin from './Admin';
import moment from 'moment';
import axios from 'axios';

class Profile extends Component {

    unBookEvent = (e) => {
        const id = e.target.id;
        axios.post('/api/profile', { id: id }).then((res) => {
            this.props.unbookEvent(res.data.event)
        })
    }

    chunkArray = (arr, size) => {
        const chunkedArray = [];
        for (let i = 0; i < arr.length; i += size) {
            chunkedArray.push(arr.slice(i, i + size))
        }
        return chunkedArray;
        
    }
    

    render() {

        const { user } = this.props;
        if (user === null) {
            return <Loader></Loader>
        } else if (!user) {
            this.props.history.push('/login')
            return null
        } else if (this.props.user.admin) {
            return (
                <Admin></Admin>
            )
        }
        const { events } = this.props.user;
        const renderEvents = events.map((event, index) => {
            return (
                <div className='card col-6' style={{width: '18rem'}} key={index}>
                    <div className='card-body'>
                        <p>{moment(event.date).format('dddd DD MMMM YYYY')}</p>
                        <p className='text-muted'>{moment(event.date).fromNow()}</p>
                        <button id={event._id} className='btn btn-success' onClick={this.unBookEvent}>Unbook</button>
                    </div>
                </div>
            )
        })

        const chunkedEvents = this.chunkArray(renderEvents, 2);

        const renderRowEvents = chunkedEvents.map((row, index) => {
            return (
                <div key={index} className="row">
                    {row}
                </div>
            )
        })

        return (
            <div id="profile">
                <div className="jumbotron jumbotron-fluid bg-primary text-white">
                    <h1>Hi, {this.props.user.name}</h1>
                </div>
                <h2>Upcoming events:</h2>
                    {renderRowEvents}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        unbookEvent: (event) => { dispatch({ type: 'UNBOOK_EVENT', event: event }) }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
