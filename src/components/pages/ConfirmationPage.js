import React from 'react';
import {Message, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { confirm } from '../../actions/auth';
import { connect } from 'react-redux'; 

class ConfirmationPage extends React.Component{

    state = {
        loading: true,
        success: false,
        errors: {},
    }

    componentDidMount(){
        this.props.confirm(this.props.match.params.token)
        .then(()=> this.setState({ loading: false, success: true }))
        .catch(err=>this.setState({ loading: false, success: false, errors: err.response.data.errors }));
    }

    render(){
        const { loading, success, errors } = this.state;

        return(
            <div>
                {
                    loading && <Message icon>
                        <Icon name='circle notched' loading />
                        <Message.Header>Validating your email</Message.Header>
                    </Message>
                }
                {
                    !loading && success && <Message success icon>
                        <Icon name='checkmark'/>
                        <Message.Content>
                        <Message.Header>Thank you, your account has been verified</Message.Header>  
                        <Link to='/dashboard'>Go to your dashboard</Link>                          
                        </Message.Content>
                    </Message>
                }
                {
                    !loading && !success && <Message negative icon>
                        <Icon name='warning sign'/>
                        <Message.Content>
                        <Message.Header>{errors.global}</Message.Header>  
                        </Message.Content>
                    </Message>
                }
            </div>
        )
    }
}

ConfirmationPage.propTypes = {
    confirm: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired, 
        }).isRequired,
    }).isRequired,
}  

export default connect(null, { confirm })(ConfirmationPage);
