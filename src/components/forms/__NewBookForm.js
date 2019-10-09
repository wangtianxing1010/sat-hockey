import React from 'react';
import { Form, Input, Label, Button } from 'semantic-ui-react';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import axios from 'axios';

class NewBookForm extends React.Component{

    state = {
        data: {
            book: '',
        },
        error: {},
        loading: false,
    }

    // input field change handler
    handleChange = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        });
    }


    validate = data => {
        const errors = {};
        if(!data.book) 
            errors.book = "Can't be empty";

        return errors;
    }

    handleSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});

        if (Object.keys(errors).length === 0){
            this.setState({loading: true});
            this.props.submit(this.state.data)
            .then(book=>console.log(book))
            // .then(()=>this.history.push('/dashboard'))
        //.err=> this.setState({loading:false, err.global: err.res.error.message})
        } 
    }
   
    render(){
        const { data } = this.state;
        return(
            <Form onSubmit={this.handleSubmit}>
                <Input labelPosition='right'
                    placeholder='Book name' onChange={this.handleChange}
                    value={data.book} type='text' id='book' name='book'>
                    <Label basic>Book</Label>
                    <input />
                    <Label>.00</Label>
                </Input>
                <br/>
                <Button primary>Create Book</Button>
            </Form>
        );
    }
}

export default NewBookForm;