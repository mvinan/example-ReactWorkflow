import React from 'react';
import User from './user';
import { getUsers } from '../api/user';

export default class UsersContainer extends React.Component{

    constructor(props) {
      super(props)
      this.state = {users:[] }
    }

    componentWillMount() {
        var _this = this;
        getUsers().then(function(response) {
            _this.setState({
                users: response.data
            })
        }).catch(function(err) {
            console.error(err);
        });
    }

    render() {
        return (
            <User users={this.state.users} />
        )
    }
}
