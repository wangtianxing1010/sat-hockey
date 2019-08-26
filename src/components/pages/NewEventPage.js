import React from 'react';
import { Segment } from 'semantic-ui-react';
import NewEventForm from '../forms/NewEventForm';

class NewEventPage extends React.Component{
    state = {
        book: null,
    };

    render(){
        return (
            <Segment padded>
                <h1>Post a new event</h1>
                <NewEventForm/>
            </Segment>
        );
    }
}

export default NewEventPage;