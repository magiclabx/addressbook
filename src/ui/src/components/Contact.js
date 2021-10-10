import React, {Component} from 'react';

class Contact extends Component {

    state = {
        firstName,
        lastName,
        homePhone
    }


    render (){
        return(
            <div className="contact">
                <div>First name: {this.state.firstName}</div>
                <div>First name: {this.state.lastName}</div>
                <div>First name: {this.state.homePhone}</div>
            </div>
        );
    }
}

export default Contact;
