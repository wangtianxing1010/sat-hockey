import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';

class DashboardPage extends React.Component{
    render(){
        const { isConfirmed } = this.props;
        return(
            <div>
                { !isConfirmed && <ConfirmEmailMessage />}
            </div>
        )
    }
}

// const DashboardPage = ({ isConfirmed }) =>(
//     <div>
//         { !isConfirmed && <ConfirmEmailMessage />}
//     </div>
// );

DashboardPage.propTypes = {
    isConfirmed: PropType.bool.isRequired
};

function mapStateToProps(state){
    return{
        isConfirmed: !!state.user.confirmed
    }
}

export default connect(mapStateToProps)(DashboardPage);