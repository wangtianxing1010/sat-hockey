import React from 'react';
import { Form, Button } from 'semantic-ui-react';


class EventForm extends React.Component{
    state = {
        errors :{},
        data: {},
    }

    render(){
        const {book} = this.props.event;
        return (
        <Form>
            <h3>Event Name: {book}</h3>
            <p>Date:</p>
            <p>Maximum Participiants</p>
            <Button>Enroll</Button>
        </Form>
        );
    }
}

export default EventForm;