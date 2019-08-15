import React from 'react';
import { Route } from 'react-router-dom';
// pages
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DashboardPage from './components/pages/DashboardPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';

// routes
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

const App = () => (
  <div className='ui container'>
    <Route path='/' exact component={HomePage} />
    <Route path='/confirmation/:token' exact component={ConfirmationPage} />
    <Route path='/reset_password/:token' exact component={ResetPasswordPage} />
    <GuestRoute path='/login' exact component={LoginPage} />
    <GuestRoute path='/signup' exact component={SignupPage} />
    <GuestRoute path='/forgot_password' exact component={ForgotPasswordPage} />
    <UserRoute path='/dashboard' exact component={DashboardPage} />
  </div>
)
export default App;
