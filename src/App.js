import React from 'react';
import { Route } from 'react-router-dom';
// pages
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import DashboardPage from './components/pages/DashboardPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
// routes
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

const App = () => (
  <div className='ui container'>
    <Route path='/' exact component={HomePage} />
    <Route path='/confirmation/:token' exact component={ConfirmationPage} />
    <GuestRoute path='/login' exact component={LoginPage} />
    <GuestRoute path='/signup' exact component={SignupPage} />
    <UserRoute path='/dashboard' exact component={DashboardPage} />
  </div>
)
export default App;
