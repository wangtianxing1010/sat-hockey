import React from 'react';
import { Form, Input, Label, Button } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import axios from 'axios';

class NewEventForm extends React.Component{
    state={
        loading: false,
        errors: {},
        data:{
            eventName: '',
            tags: [],
            maxAllowed: 0,
            datetime: {
                datetime: '',
                year: 0,
                month: 0,
                date: 0,
                weekday: 0,
                timezone: '',

                time: '',
                hour: 0,
                min: 0,
            },
            location:{
                location:'',
                room:0,
                streetNo:0,
                street:'',
                city:'',
                postCode:''
            },
            admission:0,
        }
    }

    // location google api

    // handleTypingChange =(e, {searchQuery})=>{
    //     clearTimeout(this.timer);
    //     this.setState({query: searchQuery});
    //     this.timer = setTimeout(this.fetchOptions, 1000);
    // }

    // fetchOptions = () => {
    //     if (!this.state.query) return ;
    //     this.setState({ loading: true });
    //     axios.get(`/api/books/search?q=${this.state.query}`)
    //     .then(res=>res.data.books)
    //     .then(books=>{
    //        const options = [];
    //        const bookHash = {};
    //        books.forEach(book=>{
    //            bookHash[book.id]=book;
    //            options.push({
    //             key: book.id,
    //             value: book.id,
    //             text: book.text,
    //            })
    //        });
    //        this.setState({ loading: false, books: bookHash, options })
    //     });
    // }

    // input field change handler
    handleChange = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        });
    }

    // handle date change
    handleDateChange = (e) => {
        let date = e.getDate();
        let month = e.getMonth()+1;
        let year = e.getFullYear();
        let weekday = e.getDay();
        this.setState({
            data: {
                ...this.state.data,
                datetime: {
                    ...this.state.data.datetime,
                    datetime: e,
                    date,
                    month,
                    year,
                    weekday
                }
            }
        });
    }

    validate = data => {
        const errors = {};
        if(!data.eventName) errors.eventName = "Can't be empty";
        if(data.maxAllowed<=0) errors.maxAllowed = "Has to be more than 0";
        if(!data.datetime.datetime) errors.datetime.datetime = "Please pick a date";
        if(!data.datetime.hour) errors.datetime.hour = "Please choose a time";

        //authenticated user
        if(!data.location.streetNo) errors.location.streetNo = "Can't be empty";
        if(!data.location.street) errors.location.street = "Can't be empty";
        if(!data.location.city) errors.location.city = "Can't be empty";
        
        return errors;
    }

    handleSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});

        if (Object.keys(errors).length === 0){
            this.setState({loading: true});
            this.props.submit(this.state.data)
            .then(()=>this.history.push('/dashboard'))
        //.err=> this.setState({loading:false, err.global: err.res.error.message})
        } 
    }
   
    render(){
        const { data } = this.state;
        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Field width={3}>
                        <label htmlFor='eventName'>Event Name</label>
                        <input type='text' id='eventName' name='eventName'
                        value={data.eventName} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Input label='Maximum Allowance' placeholder='Maximum Allowance' 
                    type="number" id="maxAllowed" name="maxAllowed" width={2}
                    value={data.maxAllowed} onChange={this.handleChange} />
                </Form.Group>
                <SemanticDatepicker inline onDateChange={this.handleDateChange} />
                <br />
                <h3>Location</h3>
                <Form.Group>
                    <Form.Input label='Room No.' placeholder='Room No.' value={data.room}
                    type="number" id="maxAllowed" name="maxAllowed" width={2} onChange={this.handleChange} />
                    <Form.Input label='Street No.'placeholder='Street No.' value={data.streetNo}
                    type="number" id="streetNo" name="streetNo" width={2} onChange={this.handleChange} />
                    <Form.Input label='Street' placeholder='Street' value={data.state}
                    type="text" id="street" name="street" width={4} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Input label='City' placeholder='City' width={4} value={data.city}
                    type="text" id="city" name="city" onChange={this.handleChange} />
                    <Form.Input label='Post Code' placeholder='Post Code' width={4} value={data.postCode}
                    type="text" id="postCode" name="postCode" onChange={this.handleChange} />
                    {/* <Form.Input label='Province'placeholder='Province' width={4} />
                    <Form.Input label='Nation' placeholder='Nation' width={4} /> */}
                </Form.Group>
                <br />
                <Form.Input labelPosition='right' width={3} 
                    label='Admission' placeholder='Amount' onChange={this.handleChange}
                    value={data.admission} type='number' id='admission' name='admission'>
                    <Label basic>$</Label>
                    <input />
                    <Label>.00</Label>
                </Form.Input>
                <br/>
                <Button primary>Create Event</Button>
            </Form>
        );
    }
}


export default NewEventForm;