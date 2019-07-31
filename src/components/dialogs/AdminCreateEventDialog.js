import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import axios from 'axios';
import {connect} from 'react-redux';

class AdminCreateEventDialog extends Component {

    state = {
        places: 0,
        error: null,
        users: null //users who booked this event
    }

    closeDialog = () => {
        //close dialog
        this.props.handleClose()
        //on dialog close, reset state
        this.setState({
            places: 0,
            error: null,
            users: null
        })
    }

    formatDate = () => {
        const { event } = this.props;
        if (!event.date) {
            return
        }
        return moment(event.date).format('MMM Do YYYY')
    }

    handlePlacesChange = (e) => {
        this.setState({
            places: e.target.value
        })
    }

    handleSubmit = () => {
        axios.post('/api/admin/create', {
            date: this.props.event.date,
            places: this.state.places
        }).then((res) => {
            if (res.data.error) {
                return this.setState({
                    error: res.data.error
                })
            }else if(res.data.event){
                //if new event is being cerated
                this.props.addEvent(res.data.event)
            }else if(res.data.eventUpdate){
                //if existing event is being updated
                this.props.updateEvent(res.data.eventUpdate)
            }
            //if succesful close the dialog
            this.closeDialog()
        })
    }

    handleDelete = () => {
        axios.delete('api/admin/delete?date=' + this.props.event.date).then((res) => {
            if(res.data.error){
                return this.setState({
                    error: res.data.error
                })
            }else if(res.data.deletedEvent){
                this.props.deleteEvent(res.data.deletedEvent)
                this.closeDialog();
            }
        })
    }

    renderError = () => {
        if (this.state.error) {
            return <p className='text-danger'>{this.state.error}</p>
        }
        return null;
    }

    renderUsers = () => {
        if(!this.state.users){
            return null;
        }
        const users = this.state.users.map((user, index) => {
            console.log(index)
            return(
                <li key={index}>{user.name + ' ' + user.surname}</li>
            )
        });
        return users;
    }

    componentWillReceiveProps(){
        let users;
        if(this.props.event.users){
            users = this.props.event.users
        }

        this.setState({
            places: this.props.event.places,
            users: users
        })
    }


    render() {
        if(!this.props.event){
            return null;
        }
        this.formatDate()
        return (
            <div>
                <Dialog
                    id='admin-event-dialog'
                    open={this.props.open}
                    onClose={this.closeDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <button onClick={this.handleDelete} id='admin-create-dialog-trash' className='far fa-trash-alt'></button>
                    <DialogTitle id="form-dialog-title">Add a new event</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add an event for {this.formatDate()}
                        </DialogContentText>
                        <TextField
                            label='Places'
                            value={this.state.places}
                            onChange={this.handlePlacesChange}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <ul>
                            {this.renderUsers()}
                        </ul>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                    {this.renderError()}
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addEvent: (event) => {dispatch({type: 'ADD_EVENT', event: event})},
        updateEvent: (event) => {dispatch({type: "UPDATE_EVENT", event: event})},
        deleteEvent: (event) => {dispatch({type: 'DELETE_EVENT', event: event})}
    }
}

export default connect(null, mapDispatchToProps)(AdminCreateEventDialog)