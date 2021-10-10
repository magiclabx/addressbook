import Reat, {Component} from 'React';
import Avatar from "./Avatar";



class Contact extends Compoent {

    state = {
        firstName,
        lastName,
        homePhone
    }


    render (){
        return(
            <div key={} className="contact">
                <div>First name: {this.state.firstName}</div>
                <div>First name: {this.state.lastName}</div>
                <div>First name: {this.state.homePhone}</div>
            </div>
        );
    }
}

export default Contact;
