import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as eventActions from '../../actions/book';

class HomePage extends React.Component{ 
    state = {
        data: {
            // isAuthenticated: this.props.isAuthenticated
        },
        loading: false,
        errors: {}
    }

    fetchEvents = () => {
        this.props.fetchEvents()
            .then(events=>{
                console.log(events);
                this.setState({ 
                    ...this.state, 
                    data: { events: events } 
                })
            })
            .catch(err=>this.setState({ ...this.state, errors: {err: 'some errors'} }));
    };

    componentDidMount(){
        this.fetchEvents();
    }
    
    render(){
        const {isAuthenticated} = this.props;
        const {data, errors} = this.state;
        return (
            <div>
                <h1>Home page</h1>
                {  
                    // how to add SYNTAX not expressions??
                    !isAuthenticated &&
                    <div>
                        <Link to='/login'>Login</Link> or <Link to='/signup'>Sign Up</Link>
                    </div>
                }
                <h2>All Events</h2>
                {errors 
                    ? <p>{errors.err}</p>
                    : data.events.map(event =>{
                        console.log(event)
                        // <h3>`Event name: ${event.book}, Event ID: ${event._id}`</h3>
                    })
                }
            </div>
        )
    }
};

HomePage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    fetchEvents: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        isAuthenticated: !!state.user.token
    }
}

export default connect(mapStateToProps, 
    { 
        fetchEvents: eventActions.fetchEvents,
     }
    )(HomePage);