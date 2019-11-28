import React from 'react';
import { Form, Button } from 'semantic-ui-react';


class EventForm extends React.Component{
    state = {
        errors :{},
        data: {},
    }

    enroll = () => {
        // todo add oneself in the participants list if not yet in
    }

    render(){
        const {book, maxAllowed} = this.props.event;
        const {loading} = this.props;
        return (
        <Form loading={loading}>
            <h3>Event Name: {book}</h3>
            <p>Scheduled Date: </p>
            <p>Maximum Participiants: {maxAllowed}</p>
            <Button onClick={this.enroll}>Enroll</Button>
        </Form>
        );
    }
}

export default EventForm;