import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component{
    render(){
        return (
            <div className="app">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/users">Users</Link>
                    <Link to="/patient">Patients</Link>
                </nav>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
