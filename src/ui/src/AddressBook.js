import React, { Component} from 'react';
import './AddressBook.css';
import Contact  from './components/Contact'
import axios from "axios";
import ContactEditForm from "./components/ContactEditForm";

class AddressBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            avatar: null,
            contacts: [],
            numberOfContacts: 0,
            editing: false,
            editingAt: null,
            viewing: false
        }
        this.getAllContacts();
        this.loadImageBase64 = this.loadImageBase64.bind(this);
    }
    getAllContacts = () => {
        axios.get("/contacts").then( res => {
          this.setState({ contacts: res.data, numberOfContacts: res.data.length})
        });
    }

    handleDelete = (e) => {
        e.preventDefault();
        axios.delete("/contacts/" + this.state.selected.id).then( res => {
            let sel = (res.data.length >0) ? res.data.at(res.data.length -1): null;
            this.setState({ selected: sel , contacts: res.data, numberOfContacts: res.data.length})
        });
    }

    handleAddContact = ( contact ) => {
        let list = this.state.contacts;
        list.push(contact);
        this.setState({contacts:list , numberOfContacts: list.length});
    }

    selectedContact = (val) => {
        if(val ) {
            this.setState({selected: val});
            this.loadImageBase64( val.id, (reader) => {
                this.setState({avatar: reader.result});
            });
        }
    }

    loadImageBase64 = (id, callback) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "/contact/"+ id +"/avatar");
        xhr.responseType = 'blob';
        xhr.send();
        xhr.onload = function() {
            if (xhr.status === 200) {
                // If successful, resolve the promise by passing back the request response
                var reader = new FileReader();
                reader.onloadend = function() {
                    callback(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            } else {
                // If it fails, reject the promise with a error message
                console.log('Image didn\'t load successfully; error code:' + xhr.statusText);
            }
        };

    }

    handleAdd = (e) =>{
        e.preventDefault();
        this.setState( {  selected: null,  editingAt: null, viewing: false});
    }
    handleEdit = (e) =>{
        e.preventDefault();
        this.setState( {  editingAt: this.state.selected, selected : null});
    }
    setViewing = (c) =>{
        if(c){
            this.getAllContacts();
            this.setState( { editingAt: null, selected: c });
        }else{
            this.setState( {  editingAt: null, selected: this.state.editingAt, viewing: true });
        }
    }

  render() {
      let contactsList = () => {
            return this.state.contacts.map((c) =>
                <div><Contact id={c.id} contact={c} setSelected={this.selectedContact} isListItem={true}> </Contact></div>);
      }
      let editContactOrView = () => {
          return (this.state.selected == null ) ?
              <ContactEditForm conatctToEdit={this.state.editingAt} appenedNewContact={this.handleAddContact} avatar={this.state.avatar} setFinished={this.setViewing}></ContactEditForm>
          : <div className="view-area">
                  <Contact contact={this.state.selected} ></Contact>
                  <button onClick={this.handleAdd}>Add</button>
                  <button onClick={this.handleEdit}>Edit</button>
                  <button onClick={this.handleDelete}>Delete</button></div>;
      }
    return (
      <div className="AddressBook">
        <div className="container mrgnbtm">
          <div>
              <table>
                  <tbody>
                  <tr className="header"><th colspan="2" className="hd">Contacts</th></tr>
                  <tr>
                      <td>
                          {editContactOrView()}
                       </td>
                      <td>
                          <div className="list-area">
                            {contactsList()}
                          </div>
                      </td>
                  </tr>
                  </tbody>
              </table>
        </div>
            <div>
                <div className="count"> Contacts: {this.state.numberOfContacts}</div>
            </div>
        </div>
      </div>
    );
  }
}

export default AddressBook;