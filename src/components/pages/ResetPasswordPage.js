import React from 'react';
import ResetPasswordForm from '../forms/ResetPasswordForm';
import { Message, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { resetPassword, validateResetPasswordToken } from '../../actions/auth';
import { connect } from 'react-redux';

class ResetPasswordPage extends React.Component{
    state = {
        loading: true,
        success: false,
        errors: {}
    }

    submit = (data) =>
        this.props.resetPassword(data)
        .then(()=>this.props.history.push('/login'));
    

    componentDidMount(){
        const { token } = this.props.match.params;
        
        this.props.validateResetPasswordToken(token)
            .then(()=>this.setState({ success: true, loading: false }))
            .catch(err=>this.setState({ success: false, loading: false, errors: err.response.data.errors }));
    }

    render(){
        const { loading, success, errors } = this.state; 
        const token = this.props.match.params.token;

        return (
            <div>
            {!!loading&&<Message>
                <Icon name='circle notched' />
                <Message.Header>Loading</Message.Header>
            </Message>}
            {!loading && !success && <Message>
                <Icon name='warning sign'/>
                <Message.Header>Invalid Token</Message.Header>
            </Message>}
            {!loading && !!success&& <ResetPasswordForm submit={this.submit} token={token}/>}
            </div>
            )
    }
}

ResetPasswordPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired, 
    }).isRequired,

    validateResetPasswordToken: PropTypes.func.isRequired, 
    resetPassword: PropTypes.func.isRequired,
}

export default connect(null, { validateResetPasswordToken, resetPassword })(ResetPasswordPage);