import React, { Component} from 'react';
import './AddressBook.css';
import Contact  from './components/Contact'
import axios from "axios";
import Avatar from "./components/Avatar";
import FileBase64 from "react-file-base64";

class AddressBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            contact: {
                id: null,
                firstName: "",
                last: "",
                homePhone: "",
                mobilePhone: "",
                officePhone: "",
                address:"",
                avatar: null
            },
            contacts: [],
            numberOfContacts: 0,
            editing: false
        }

        this.getAllContacts();
        this.submitAvatar = this.submitAvatar.bind(this);
        this.loadImageBase64 = this.loadImageBase64.bind(this);
    }

  emptyContact = {
        id: null,
        firstName: "",
        lastName: "",
        homePhone: "",
        mobilePhone: "",
        officePhone: "",
        address:"",
        avatar: null
    }

    getAllContacts = () => {
        axios.get("http://localhost:8080/api/contacts").then( res => {
           console.log("allContacts()");
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

    submitAvatar = (id) =>{
        let data = new FormData();
        data.append('file', this.state.tmpImagFile, id);
        console.log(this.state.tmpImagFile);
        axios.post("http://localhost:8080/api/contacts/contact/" + id + "/avatar", data,{
            headers: {
                'Accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': "*"
            }
        }).then((response) => {
            //handle success
            this.setState({ tmpImagFile: null});
        }).catch((error) => {
            //handle error
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.state.editing){
          axios.post("http://localhost:8080/api/contacts/contact", this.state.contact)
              .then(res => {
                  let list = this.state.contacts;
                  list.push(res.data);
                  console.log(res.data);
                  this.setState({contact: this.emptyContact, contacts:list , numberOfContacts: list.length});
                  if( this.state.tmpImagFile){
                      this.submitAvatar(res.data.id);
                  }
              });
        }else{
          axios.patch("http://localhost:8080/api/contacts/contact", this.state.contact)
              .then(res => this.setState({contact: this.emptyContact, contacts:res.data, editing: false }));
        }
    }

    selectedContact = (val) => {
        if(val !== undefined || val !== null ) {
            this.setState({selected: val});
            this.loadImageBase64( val.id, (reader) => {
                this.setState({avatar: reader.result});
            });
        }
    }

    uploadedAvatar = (file) => {
        console.log(file);
        this.setState({ tmpImagFile: file});
    }

    loadImageBase64 = (id, callback) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://localhost:8080/api/contacts/contact/"+ id +"/avatar");
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
          addeditButton =  <button onClick={this.handleSubmit}>Edit</button>;
      } else {
          addeditButton =  <button onClick={this.handleSubmit}>Add</button>;
      }
    return (
      <div className="AddressBook">
        <div className="container mrgnbtm">
          <div>
              <table>
                  <tbody>
                  <tr className="header">Contacts</tr>
                  <tr>
                      <td>
                          <form onSubmit={this.handleSubmit} className="editForm" >
                              <Avatar imageBase64={this.state.avatar} setImageFile={this.uploadedAvatar}></Avatar>
                              <div>First Name <input name={"firstName"} type={"text"} value={this.state.contact.firstName} onChange={this.onChangeForm}
                                                     required className={this.state.inputclass} /></div>
                              <div>Last Name <input name={"lastName"} type={"text"} value={this.state.contact.lastName} onChange={this.onChangeForm}
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
                <div className="count"> Contacts: {this.state.numberOfContacts}</div>
            </div>
        </div>
      </div>
    );
  }
}

export default AddressBook;