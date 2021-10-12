import React, { Component} from 'react';
import './AddressBook.css';
import Contact  from './components/Contact'
import axios from "axios";

class AddressBook extends Component {

    constructor(props) {
        super(props);
        this.getAllContacts();
        //this.selectedContact = this.selectedContact.bind(this)
    }
    state = {
        selected: null,
        contact:  {
            firstName: "",
            last: "",
            homePhone: "",
            mobilePhone: "",
            officePhone: "",
            address:""
        },
        contacts: [],
        numberOfContacts: 0,
        editing: false
    }
  emptyContact = {
        firstName: "",
        lastName: "",
        homePhone: "",
        mobilePhone: "",
        officePhone: "",
        address:""
    }

  getAllContacts = () => {
      console.log("get");
      axios.get("http://localhost:8080/api/contacts").then( res => {
          console.log(res);
          this.setState({ contacts: res.data, numberOfContacts: res.data.length})
      });
  }

    handleDelete = (e) => {
        e.preventDefault();
        axios.delete("http://localhost:8080/api/contacts/" + this.state.selected.id).then( res => {
            this.setState({ selected: null, contacts: res.data, numberOfContacts: res.data.length})
        });
    }

    handleEdit = (e) => {
        e.preventDefault();
        this.setState({ contact: this.state.selected, editing: true});
    }

    onChangeForm = (e) => {
        let co = this.state.contact;
        if (e.target.name === 'firstName') {
              co.firstName = e.target.value;
            } else if (e.target.name === 'lastName') {
              co.lastName = e.target.value;
            } else if (e.target.name === 'homePhone') {
              co.homePhone = e.target.value;
            }else if (e.target.name === 'mobilePhone') {
              co.mobilePhone = e.target.value;
            }else if (e.target.name === 'officePhone') {
              co.officePhone = e.target.value;
            }else if (e.target.name === 'address') {
              co.address = e.target.value;
            }
            this.setState({contact: co});
        }

    handleReset = (e) =>{
        this.setState({ selected: null, contact: this.emptyContact, editing: false});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.state.editing){
          axios.post("http://localhost:8080/api/contacts/contact", this.state.contact)
              .then(res => this.setState({contact: this.emptyContact, contacts:res.data }));
        }else{
          axios.patch("http://localhost:8080/api/contacts/contact", this.state.contact)
              .then(res => this.setState({contact: this.emptyContact, contacts:res.data, editing: false }));
        }
    }
    selectedContact = (val) => {
        this.setState({selected: val });
    }

  render() {
      let contactList = () => {
         return this.state.contacts.map((c, index) => <div><Contact id={c.id} contact={c} setSelected={this.selectedContact} isListItem={true}> </Contact></div>);
      };

      let contactInfo = () => {
          return  (this.state.selected !== null)?<div>
              <Contact contact={this.state.selected}></Contact>
              <button onClick={this.handleEdit}>Edit</button>
              <button onClick={this.handleDelete}>Delete</button></div>: <div>Noting selected</div> ;
      };

      let addeditButton;
      if(this.state.editing) {
          addeditButton =  <button onClick={this.handleReset}>Edit</button>;
      } else {
          addeditButton =  <button onClick={this.handleReset}>Add</button>;
      }
    return (
      <div className="AddressBook">
        <div className="container mrgnbtm">
          <div>
              <table>
                  <tbody>
                  <tr class="header">Contacts</tr>
                  <tr>
                      <td>
                          <form onSubmit={this.handleSubmit} className="editForm" >
                              <div>First Name <input name={"firstName"} type={"text"} value={this.state.contact.firstName} onChange={this.onChangeForm}
                                                     required className={this.state.inputclass} /></div>
                              <div>First Name <input name={"lastName"} type={"text"} value={this.state.contact.lastName} onChange={this.onChangeForm}
                                                     className={this.state.inputclass} /></div>
                              <div>Phone numbers</div>
                              <div>Home <input name={"homePhone"} type={"text"} value={this.state.contact.homePhone} onChange={this.onChangeForm} className={this.state.inputclass} /></div>
                              <div>Mobile <input name={"mobilePhone"} type={"text"} value={this.state.contact.mobilePhone} onChange={this.onChangeForm} className={this.state.inputclass} /></div>
                              <div>Company <input name={"officePhone"} type={"text"} value={this.state.contact.officePhone}  onChange={this.onChangeForm} className={this.state.inputclass} />
                              </div>
                              <div></div>
                              <div>Address <textarea name={"address"} type={"text"} value={this.state.contact.address} onChange={this.onChangeForm} className={this.state.clainputclassss} /></div>
                              <button onClick={this.handleReset}>Reset</button>
                              {addeditButton}
                          </form>
                       </td>
                      <td>
                          <div className="listArea">
                            {contactList()}
                          </div>
                      </td>
                      <td>
                          <div className="selectedInfo">
                              {contactInfo()}
                          </div>
                      </td>
                  </tr>
                  </tbody>
              </table>
        </div>
            <div>
                <div className="count"> Cotacts: {this.state.numberOfContacts}</div>
            </div>
        </div>
      </div>
    );
  }
}

export default AddressBook;