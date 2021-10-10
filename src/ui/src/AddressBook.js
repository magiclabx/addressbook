import React, { Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddressBook.css';
import { Header } from './components/Header'
import { Contact } from './components/Contact'
import { DisplayBoard } from './components/DisplayBoard'
import { getAllContacts, addContact } from './services/ContactService'
import axios from "axios";

class AddressBook extends Component {

  state = {
    contacts: [],
    numberOfContacts: 0
  }

   fetchContacts = () =>{
        axios.get("http://localhost:8080/api/contacts").then( res =>{
            console.log(res);
            return res.data;
        })
    }

  addContact = (contact) => {
      console.log(contact);
      this.setState({
          contacts: this.state.contact.push(contact),
          numberOfContacts: this.state.numberOfContacts + 1
      });
  }

  getAllContacts = () => {
      this.fetchContacts.then(contacts => {
        this.setState({contacts: contacts, numberOfContacts: contacts.length})
      });
  }

  onChangeForm = (e) => {
      let user = this.state.contacts
      if (e.target.name === 'firstName') {
          user.firstName = e.target.value;
      } else if (e.target.name === 'lastName') {
          user.lastName = e.target.value;
      } else if (e.target.name === 'homePhone') {
          user.homePhone = e.target.value;
      }
      this.setState({contact: user});
  }

  render() {

    return (
      <div className="AddressBook">
        <Header></Header>
        <div className="container mrgnbtm">
          <div className="row">
            <div className="col-md-8">
                <Creatcontact
                  contact={this.state.contact}
                  onChangeForm={this.onChangeForm}
                  addContact={this.addContact}
                  >
                </Creatcontact>
            </div>
            <div className="col-md-4">
                <DisplayBoard
                  numberOfContacts={this.state.numberOfContacts}
                  getAllContacts={this.getAllContacts}
                >
                </DisplayBoard>
            </div>
          </div>
        </div>
        <div className="row mrgnbtm">
          <Contact users={this.state.contacts}></Contact>
        </div>
      </div>
    );
  }
}

export default AddressBook;