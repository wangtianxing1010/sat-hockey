import React from 'react';
import { Form, Label, Button } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import InlineError from '../messages/InlineError';
import PropTypes from 'prop-types';

class NewEventForm extends React.Component{
    state={
        loading: false,
        errors: {},
        // data:{
        //     eventName: '',
        //     tags: [],
        //     maxAllowed: 0,
        //     admission:0,
        //     // datetime
        //     datetime: '',
        //     year: 0,
        //     month: 0,
        //     date: 0,
        //     weekday: 0,
        //     timezone: '',

        //     time: '',
        //     hour: 0,
        //     min: 0,
        //     // location
        //     location:'',
        //     room:0,
        //     streetNo:0,
        //     street:'',
        //     city:'',
        //     postCode:'',
        // }
        data:{
            eventName: 'hockey',
            tags: [],
            maxAllowed: 10,
            admission:0,
            // datetime
            datetime: '',
            year: 0,
            month: 0,
            date: 0,
            weekday: 0,
            timezone: '',

            time: '',
            hour: 0,
            min: 0,
            // location
            location:'',
            room:0,
            streetNo:30,
            street:'warwick ave',
            city:'ajax',
            postCode:'',
        }
    }

    // future location input: sending query to location google api

    // handleTypingChange =(e, {searchQuery})=>{
    //     clearTimeout(this.timer);
    //     this.setState({query: searchQuery});
    //     this.timer = setTimeout(this.fetchOptions, 1000);
    // }

    // fetchOptions = () => {
    //     if (!this.state.query) return ;
    //     this.setState({ loading: true });
    //     axios.get(`/api/location/search?q=${this.state.query}`)
    //     .then(res=>res.data.location)
    //     .then(location=>{
    //        const options = [];
    //        const bookHash = {};
    //        location.forEach(=>{
    //            bookHash[book.id]=book;
    //            options.push({
    //             key: .id,
    //             value: .id,
    //             text: .text,
    //            })
    //        });
    //        this.setState({ loading: false, location: bookHash, options })
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
        console.log('datetime', e);
        console.log('datetime type', typeof(e));

        let date = e.getDate();
        let month = e.getMonth()+1;
        let year = e.getFullYear();
        let weekday = e.getDay();
        this.setState({
            data: {
                ...this.state.data,
                datetime: e,
                date,
                month,
                year,
                weekday
            }
        });
    }

    validate = data => {
        const errors = {};
        if(!data.eventName) errors.eventName = "Can't be empty";
        if(data.maxAllowed<=0) errors.maxAllowed = "Has to be more than 0";
        if(!data.datetime) errors.datetime.datetime = "Please pick a date";
        // if(!data.datetime.hour) errors.datetime.hour = "Please choose a time";

        if(!data.streetNo) errors.location.streetNo = "Can't be empty";
        if(!data.street) errors.location.street = "Can't be empty";
        if(!data.city) errors.location.city = "Can't be empty";
        //authenticated user

        return errors;
    }

    handleSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});

        if (Object.keys(errors).length === 0){
            this.setState({loading: true});
            this.props.submit(this.state.data)
                .catch(err=> {
                    this.setState({loading:false, errors: err});
                })
        } 
    }
   
    render(){
        const { data, loading } = this.state;
        return(
            <Form onSubmit={this.handleSubmit} loading={loading}>
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
                    <Form.Input label='Street' placeholder='Street' value={data.street}
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

NewEventForm.propType = {
    submit: PropTypes.func.isRequired,
}

export default NewEventForm;