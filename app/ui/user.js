import React from 'react';

export default class User extends React.Component{
    render() {
        return (
            <div>
              <h1>App: Users</h1>
              {this.props.users.map((user, i)=>{
                return <li key={user.id}>{user.name}</li>
              })}
            </div>
        )
    }
}
