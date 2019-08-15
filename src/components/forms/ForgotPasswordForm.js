import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';
import Validator from 'validator';
import PropTypes from 'prop-types';

class ForgotPasswordForm extends React.Component{
    state = {
        data: {
            email: '',
        },
        loading: false, 
        errors: {}        
    }

    validate = data =>{
        const errors = {};
        if(!Validator.isEmail(data.email)) errors.email="Invalid Email";
        return errors;
    }

    handleChange = e =>{
        this.setState({ data: { ...this.state.data, [e.target.name]: e.target.value } })
    }

    handleSubmit = e =>{
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if(Object.keys(errors).length===0){
            // no frontend errors, send email
            this.setState({loading: true});
            this.props.submit(this.state.data)
            .catch(err=>this.setState({errors: {global: err.response.data.errors}, loading: false }));
            console.log('forgot password page working')
        }
    }

    render(){
        const { data, loading, errors } = this.state;
        return(
            <div>
            { errors.global && 
                (<Message negative>
                   <Message.Header>
                       Something went wrong
                   </Message.Header>
                   <p>{errors.global}</p>
               </Message>) 
               }

            <Form loading={loading} onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label htmlFor='email'>Email for the Account you want to reset password for</label>
                    <input 
                    name='email' id='email' type='email'
                    placeholder='email' onChange={this.handleChange}
                    value={data.email} />
                </Form.Field>
                { errors.email && <InlineError text={errors.email} />}
                <Button primary>Send Email</Button>
            </Form>
            </div>
        )
    }
}

ForgotPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired,
}

export default ForgotPasswordForm;