import React, { Component } from 'react';
import Loader from '../Loader';
import {connect} from 'react-redux';

const AdminUsersTable = (props) => {
    const {users} = props;
    if(!users){
        return <Loader></Loader>
    }

    const renderUser = users.map((user, index) => {
        return(
            <tr key={index}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.address.city}</td>
                <td>{user.address.street}</td>
                <td>{user.address.number}</td>
            </tr>
        )
    })
    return(
        <table className="admin-users-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>City</th>
                    <th>Street</th>
                    <th>Street Number</th>
                </tr>
            </thead>
            <tbody>
                {renderUser}
            </tbody>
        </table>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(AdminUsersTable);
