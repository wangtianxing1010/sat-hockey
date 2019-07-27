import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../forms/LoginForm';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class LoginPage extends React.Component{

    submit = data =>{
        console.log(data);
    }

    render(){
        return(
        <div>
            <h1>Login page</h1>

            <LoginForm submit={this.submit}/>
        </div>    
        );
    }
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
}

export default connect(null, { login })(LoginPage);