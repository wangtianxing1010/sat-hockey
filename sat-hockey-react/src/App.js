import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
// pages
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DashboardPage from './components/pages/DashboardPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import NewEventPage from './components/pages/NewEventPage';
// navigations
import TopNavigation from './components/navigations/TopNavigation';
// routes
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

class App extends React.Component{
  componentDidMount(){
    console.log('component type', typeof(HomePage));
    console.log('component type', typeof(SignupPage));
    console.log('function type', typeof(mapStateToProps));
  }

  render(){
    return(
      <div className='ui container'>
        {!!this.props.isAuthenticated && <TopNavigation />}
        <Route path='/' exact component={HomePage} />
        <Route path='/confirmation/:token' exact component={ConfirmationPage} />
        <Route path='/reset_password/:token' exact component={ResetPasswordPage} />
        <GuestRoute path='/login' exact component={LoginPage} />
        <GuestRoute path='/signup' exact component={SignupPage} />
        <GuestRoute path='/forgot_password' exact component={ForgotPasswordPage} />
        <UserRoute path='/dashboard' exact component={DashboardPage} />
        <UserRoute path='/books/new' exact component={NewEventPage} />
      </div>
    )    
  }
}

function mapStateToProps(state){
  return {
    isAuthenticated: !!state.user.email,
  }
}

export default connect(mapStateToProps)(App);
