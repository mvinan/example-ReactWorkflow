import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

//Layouts
import Layout from './ui/layouts/app'

// Components
import Home from './ui/home';
import Users from './ui/user';
import Patients from './ui/patients';

class App extends React.Component{
  render(){
    return (
      <RoutingViews />
    )
  }
}

export default App;

class RoutingViews extends React.Component{
  render(){
    return(
      <Router history={browserHistory}>
        <Route component={Layout}>
          <Route path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/patient" component={Patients} />
        </Route>
      </Router>
    )
  }
}
