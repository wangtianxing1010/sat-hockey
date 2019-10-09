import React from 'react';
import { Form, Button } from 'semantic-ui-react';


class EventForm extends React.Component{
    state = {
        errors :{},
        data: {},
    }

    render(){
        return (
        <Form>
            <h1>Event Name</h1>
            <p>Date:</p>
            <p>Maximum Participiants</p>
            <Button>Enroll</Button>
        </Form>
        );
    }
}

export default EventForm;