import React from 'react';
import { Link } from 'react-router';
import AsideContainer from '../aside-container';


export default class Layout extends React.Component{
    render(){
        return (
            <div className="app container">
                <nav>
                    <Link to="/">Home</Link><br />
                    <Link to="/widgets">Widgets</Link><br />
                    <Link to="/users">Users</Link>
                </nav>
                <AsideContainer/>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
