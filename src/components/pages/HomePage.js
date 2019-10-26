import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as eventActions from '../../actions/book';
import EventForm from '../forms/EventForm';

class HomePage extends React.Component{ 
    state = {
        data: {
            // isAuthenticated: this.props.isAuthenticated
        },
        loading: false,
        errors: {}
    }

    componentDidMount(){
        this.setState({loading: true})
        this.onInit();
    }

    onInit = () => {
        this.props.fetchEvents()
            .then(()=>{
                this.setState({...this.state, loading: false})
            })
            .catch(err=>{
                console.log('err msg', err);
                this.setState({ ...this.state, errors: {err}, loading: false })
            });
    };
    
    renderItems = () => {
        return <>
            <h2>All Events</h2>
            <ul>
                {this.props.events.map((event, i)=><EventForm key={i} event={event} />)}
            </ul>
        </>
    }
    
    render(){
        const { isAuthenticated } = this.props;
        const {loading} = this.state;
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
                
                { this.props.events instanceof(Array) && this.renderItems()}
            </div>
        )
    }
};

HomePage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    fetchEvents: PropTypes.func.isRequired,
    // events: PropTypes.arrayOf(PropTypes.shape({
    //     book: PropTypes.string.isRequired,
    //     _id: 
    // })).isRequired
}

function mapStateToProps(state){
    return {
        isAuthenticated: !!state.user.token,
        events: state.events,
    }
}

export default connect(mapStateToProps, 
    { 
        fetchEvents: eventActions.fetchEvents,
     }
    )(HomePage);
