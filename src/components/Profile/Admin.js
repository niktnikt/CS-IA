import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar'; //https://www.npmjs.com/package/react-calendar
import '../../component-styles/admin.css';
import AdminCreateEventDialog from '../dialogs/AdminCreateEventDialog';
import Loader from '../Loader';
import {connect} from 'react-redux';
import AdminUsersTable from './Admin-users-table';

class Admin extends Component{

    state = {
        error: null,
        date: new Date(),
        dialogOpen: false,
        eventAccessed: {
            places: 0
        },
    }

    handleDialogOpen = () => {
        this.setState({
            dialogOpen: !this.state.dialogOpen
        })
    }

    onCalendarChange = (date) => {
        this.setState({date})
    }

    onClickDay = (date) => {
        //find the event that was clicked by comparing dates, if it is an existing one set state to it to allows editting, else set state to an empty one
        const isoDate = date.toISOString();
        const dates = this.props.events.map((event) => {return event.date});
        const index = dates.indexOf(isoDate);
        if(index > -1){
            this.setState({
                eventAccessed: this.props.events[index]
            }, () => {
                this.handleDialogOpen();
            })
        }else{
            const event = {
                places: 0,
                date: date.toISOString()
            }
            this.setState({
                eventAccessed: event
            }, () => {
                this.handleDialogOpen();
            })
        }
    }

    componentDidMount(){
        //fetch data
        axios.get('/api/admin').then((res) => {
            if(res.data.error){
                this.setState({
                    error: res.data.error
                })
            }else if(res.data.users){
                this.props.fetchUsers(res.data.users)
            }
        })
    }

    render(){

        //function has to be inside render so that every time redux state chnages it is re-created and therefore called everytime on the calendar, this allows to update days without page refresh
        const renderDataToDays = ({ date, view }) => {
            //check if there is an event for this date of yes output the number of places to the calendar
            const {events} = this.props;
            const eventsDate = events.map((event) => {return event.date});
            const index = eventsDate.indexOf(date.toISOString());
            
            if(view === 'month' && index > -1){
                const event = events[index];
                return <p className='text-success'>{event.places}</p>
            }else{
                return <p className='text-success'>-</p>;
            }
        
        }

        if(this.state.error){
            return <p className='text-danger'>{this.state.error}</p>
        }else if(!this.props.events){
            return <Loader></Loader>
        }
        return(
            <div className="admin">
                <h1>Admin dashboard</h1>
                <div className='admin-calendar-div'>

                    <Calendar
                        onChange={this.onCalendarChange}
                        value={this.state.date}
                        onClickDay={this.onClickDay}
                        tileContent={renderDataToDays}
                    />
                    <AdminCreateEventDialog event={this.state.eventAccessed} open={this.state.dialogOpen} handleClose={this.handleDialogOpen}></AdminCreateEventDialog>
                    <AdminUsersTable></AdminUsersTable>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.events
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        fetchUsers: (users) => {dispatch({type: 'FETCH_USERS', users: users})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)