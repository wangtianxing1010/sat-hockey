import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class ResetPasswordForm extends React.Component{

    state = {
        data: {
            token: this.props.token,
            password: '',
            password2: ''
        },
        loading: false,
        errors: {},
    };

    handleChange = e =>{
        this.setState({ 
            ...this.state,
            data: {...this.state.data, [e.target.name]: e.target.value}
        });
    }

    validate = (data) =>{
        const errors = {};
        if (!data.password) errors.password = "Can't be empty";
        if (data.password !== data.password2) errors.password2 = "Passwords don't match"
        return errors;
    }

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props
              .submit(this.state.data)
              .catch(err =>
                this.setState({ errors: err.response.data.errors, loading: false })
              );
          }
    }
            
    render(){
        const { data, errors, loading } = this.state;
        return (
            <Form onSubmit={this.handleSubmit} loading={loading}>
                <Form.Field>
                    <label htmlFor='password'>New Password</label>
                    <input type='password' id='password' name='password'
                    onChange={this.handleChange} value={data.password} 
                    placeholder='password'/>
                    {errors.password && <InlineError text={errors.password}/>}
                </Form.Field>

                <Form.Field>
                    <label htmlFor='password2'>Confirm Password</label>
                    <input type='password' id='password2' name='password2'
                    onChange={this.handleChange} value={data.password2} 
                    placeholder='repeat' />
                    {errors.password2 && <InlineError text={errors.password2}/>}
                </Form.Field>
                <Button primary>Reset Password</Button>
            </Form>
        )
    }
}

export default ResetPasswordForm;