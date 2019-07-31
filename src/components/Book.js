import React, { Component } from 'react';
import {connect} from 'react-redux';
import Calendar from 'react-calendar';
import Loader from './Loader';
import axios from 'axios';
import '../component-styles/book.css'

class Book extends Component{

    state = {
        date: new Date(),
        error: null
    }

    // onCalendarChange = (date) => {
    //     this.setState({date})
    // }

    onClickDay = (date) => {
        axios.post('/api/book', {
            date: date.toISOString()
        }).then((res) => {
            if(res.data.error){
                this.setState({
                    error: res.data.error
                })
            }else if(res.data.event){
                this.props.bookEvent(res.data.event)
            }else if(res.data.unbookedEvent){
                this.props.unbookEvent(res.data.unbookedEvent)
            }
        })
    }

    tileDisabled = ({activeStartDate, date, view }) => {
        //disable dates that don't have any events
        const {events} = this.props;
        const eventsDate = events.map((event) => {return event.date});
        const index = eventsDate.indexOf(date.toISOString());
        //check if the current user has this event booked
        const userEventDates = this.props.user.events.map((event) => {return event.date});
        const bookedIndex = userEventDates.indexOf(date.toISOString());
        //disable tile if event doesn't exist or if all of the places are already booked --> if the number of places is <= than numbe rof users and the current user doesn't have this event booked disable it
        if((view === 'month' && index === -1) || (view ==='month' && events[index].places <= events[index].users.length && bookedIndex === -1)){
            return true
        }
        return false;
    }

    render(){

        if(this.state.error){
            return <p className='text-danger'>{this.state.error}</p>
        }else if(!this.props.events || !this.props.user){
            return <Loader></Loader>
        }

        const renderDataToDays = ({ date, view }) => {
            //check if there is an event for this date of yes output the number of places to the calendar
            const {events} = this.props;
            const eventsDate = events.map((event) => {return event.date});
            const index = eventsDate.indexOf(date.toISOString());
            
            if(view === 'month' && index > -1){
                const event = events[index];
                return <p className='text-success'>{event.places}</p>
            }else{
                return <p className='text-muted'>-</p>
            }
        
        }

        const tileBackgroundColor = ({date}) => {
            //if the event is already booked by user make it green else leave it blank
            const userEventDates = this.props.user.events.map((event) => {return event.date});
            const index = userEventDates.indexOf(date.toISOString());
            if(index !== -1){
                return 'bg-success'
            }
            return
        }

        return(
            <div id="book">
                <h1>Book page</h1>
                <Calendar
                        value={this.state.date}
                        onClickDay={this.onClickDay}
                        tileContent={renderDataToDays}
                        tileDisabled={this.tileDisabled}
                        tileClassName={tileBackgroundColor}
                    />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        events: state.events,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        bookEvent: (event) => {dispatch({type: 'BOOK_EVENT', event: event})},
        unbookEvent: (event) => {dispatch({type: 'UNBOOK_EVENT', event: event})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)