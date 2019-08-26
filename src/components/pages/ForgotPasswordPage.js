import React from 'react';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { resetPasswordRequest } from '../../actions/auth';

class ForgotPasswordPage extends React.Component{
    state={
        msg: '',
        success: false,
    }

    submit = data => 
    this.props
        .resetPasswordRequest(data)
        .then(msg=>this.setState({msg}));
        // .then(()=>this.setState({ success: true }));
        
    render(){
        const { msg } = this.state;

        return(
            <div>
                { !!msg 
                ? <Message success>
                    <Message.Header>Email Sent</Message.Header>
                    <p>{msg}</p>
                </Message>
                :<ForgotPasswordForm submit={this.submit} />}
            </div>
        )
    }
}

ForgotPasswordPage.propTypes = {
    resetPasswordRequest: PropTypes.func.isRequired
}

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);