import React, { Component } from 'react'
import {connect} from 'react-redux';
import Loader from '../Loader';

class Profile extends Component{
    render(){
        const {user} = this.props;
        if(user === null){
            return <Loader></Loader>
        }else if(!user){
            this.props.history.push('/login')
            return null
        }
        return(
            <div id="profile">
                <p>Profile</p>
                <p>{this.props.user.email}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
      user: state.user
    }
}

export default connect(mapStateToProps)(Profile)
