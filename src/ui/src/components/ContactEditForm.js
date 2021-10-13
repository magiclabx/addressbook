import React, {Component} from "react";
import Avatar from "./Avatar";
import axios from "axios";

const url = "http://localhost:8080/api/contacts/contact";

class ContactEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //selected: null,
            contact: null,
            isEditing : false
        }
        if (props.conatctToEdit !=null){
            this.state.contact = props.conatctToEdit;
        }else{
            this.state.contact = {
                id: null,
                firstName: "",
                lastName: "",
                homePhone: "",
                mobilePhone: "",
                officePhone: "",
                address:"",
                avatar: null
            }
        }
        this.submitAvatar = this.submitAvatar.bind(this);
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

    handleComplete = (e) => {
        e.preventDefault();
        this.props.setFinished(this.props.conatctToEdit);
        //this.setState({selected: null, contact: this.emptyContact, editing: false});
    }

    submitAvatar = (id) =>{
        let data = new FormData();
        data.append('file', this.state.tmpImagFile, id);
        console.log(this.state.tmpImagFile);
        console.log(id);
        axios.post(url + "/" + id + "/avatar", data,{
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
        if(!this.props.conatctToEdit){
            axios.post( url, this.state.contact)
                .then(res => {
                    if( this.state.tmpImagFile){
                        this.submitAvatar(res.data.id);
                    }
                    this.props.appenedNewContact(res.data);
                });
        }else{
            axios.patch(url + "/update", this.state.contact)
                .then(res => {
                    if( this.state.tmpImagFile){
                        console.log("call submit")
                        this.submitAvatar(this.state.contact.id);
                    }
                    this.props.setFinished(res.data);
                });

        }
    }

    uploadedAvatar = (file) => {
        console.log(file);
        this.setState({ tmpImagFile: file});
    }

    render() {

        let addeditButton;
        if(this.props.conatctToEdit) {
            addeditButton =  <button onClick={this.handleSubmit}>Edit</button>;
        } else {
            addeditButton =  <button onClick={this.handleSubmit}>Add</button>;
        }

        return (
            <div className="ContactEditForm">
                <form onSubmit={this.handleSubmit} className="editForm">
                    <Avatar contactId={this.state.contact.id} setImageFile={this.uploadedAvatar}></Avatar>
                    <div>First Name: <input name={"firstName"} type={"text"} value={this.state.contact.firstName}
                                            onChange={this.onChangeForm}
                                            required /></div>
                    <div>Last Name: <input name={"lastName"} type={"text"} value={this.state.contact.lastName}
                                           onChange={this.onChangeForm}/></div>
                    <div>---Phone numbers---</div>
                    <div>Home: <input name={"homePhone"} type={"text"} value={this.state.contact.homePhone}
                                      onChange={this.onChangeForm} /></div>
                    <div>Mobile: <input name={"mobilePhone"} type={"text"} value={this.state.contact.mobilePhone}
                                        onChange={this.onChangeForm} /></div>
                    <div>Company: <input name={"officePhone"} type={"text"} value={this.state.contact.officePhone}
                                        onChange={this.onChangeForm} />
                    </div>
                    <div>Address: </div>
                    <div><textarea name={"address"} type={"text"} value={this.state.contact.address}
                                   onChange={this.onChangeForm} /></div>
                    <div>
                        <button onClick={this.handleComplete}>Cancel</button>
                        {addeditButton}
                    </div>
                </form>
            </div>
        )

    }

}
export default ContactEditForm;
