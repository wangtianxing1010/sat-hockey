import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class SignupForm extends React.Component{
    state = {
        data: {
            email:'',
            password: '',                
        },
        loading: false,
        errors: {}
    }

    onChange = e => this.setState({ 
        ...this.state,
        data: {...this.state.data, [e.target.name]: e.target.value }
    })

    validate = data =>{
        const errors = {};
        console.log('vlidate');
        if(!data.password) errors.password = "Can't be empty";
        if(!Validator.isEmail(data.email)) errors.email = "Invalid email";
        console.log('errors', errors);
        return errors;
    }

    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0){
            this.setState({ loading: true });
            this.props.submit(this.state.data)
                .catch(err => {
                    this.setState({ errors: err.response.data.errors, loading: false })
                });//get errors from server
        }
    };
    
    render(){
        const {errors, loading, data} = this.state;
        return(
            <Form onSubmit={this.onSubmit} loading={loading}>

                <Form.Field error={!!errors.email}>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' placeholder="email" 
                    value={data.email} onChange={this.onChange}></input>
                    {errors.email && <InlineError text={errors.email}/>}
                </Form.Field>

                <Form.Field error={!!errors.password}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' placeholder="password" 
                    value={data.password} onChange={this.onChange}></input>
                    {errors.password && <InlineError text={errors.password} />}
                </Form.Field>
                <Button primary>Sign Up</Button>
            </Form>
        );
    }
} 

SignupForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default SignupForm;