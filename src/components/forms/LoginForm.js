import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import PropTypes from 'prop-types';

class LoginForm extends React.Component{
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    };

    onChange = e => 
        this.setState({ 
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    
     
    validate = data => {
        const errors = {}; 
        // validation before submitting
        if (!Validator.isEmail(data.email)) errors.email = "Email invalid";
        if(!data.password) errors.password = "Password can't be blank";
        return errors;
    };
    
    onSubmit = () => {
        const errors = this.validate(this.state.data); // will return empty if no errors
        this.setState({ errors });
        // if no errors, the length will be 0
        if (Object.keys(errors).length === 0){
            this.setState({ loading: true });
            this.props.submit(this.state.data)
                .catch(err => 
                    // console.log(err)
                    this.setState({ errors: err.response.data.errors, loading: false })
                );//get errors from server
        }
    };


    render(){
        const { data, errors, loading } = this.state;

        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                { errors.global && 
                 (<Message negative>
                    <Message.Header>
                        Something went wrong
                    </Message.Header>
                    <p>{errors.global}</p>
                </Message>) 
                }

                <Form.Field error={!!errors.email}>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' placeholder='example@example.com'
                    value={data.email} onChange={this.onChange}/>

                    {errors.email && <InlineError text={errors.email}/>}
                </Form.Field>

                <Form.Field error={!!errors.password}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password'
                    value={data.password} onChange={this.onChange}/>

                    {errors.password && <InlineError text={errors.password}/>}
                </Form.Field>

                <Button primary>Login</Button>
            </Form>
        );
    }
}

LoginForm.protoType = {
    submit: PropTypes.func.isRequired,
}

export default LoginForm;