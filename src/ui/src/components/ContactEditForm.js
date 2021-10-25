import React, {Component} from "react";
import Avatar from "./Avatar";
import axios from "axios";

const url = "/contacts/contact";

class ContactEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //selected: null,
            contact: null,
            isEditing : false,
            error : null
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
                address: "",
                birthday: "",
                homepage: "",
                note: "",
                avatar: null
            }
        }
        this.submitAvatar = this.submitAvatar.bind(this);
    }

    handleValidation() {
        //Name
        if (this.state.contact.firstName =="") {
            this.setState( {error :"First name is required."});
            return false;
        }

        if ( (this.state.contact.homePhone !== ""&& !this.state.contact.homePhone.match(/^[0-9 -]+$/) ) ||
            (this.state.contact.mobilePhone !== ""&& !this.state.contact.mobilePhone.match(/^[0-9 -]+$/) )||
            (this.state.contact.officePhone !== ""&& !this.state.contact.officePhone.match(/^[0-9 -]+$/) )){
                this.setState( {error :"Telephone numbers are only 0-9 - and space."});
                return false;
        }

        //birthday
        if (this.state.contact.birthday && this.state.contact.birthday !== "" ) {
            if (!this.state.contact.birthday.match(/[0-9]{2}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{4}/)) {
                this.setState( {error :"Birthday can only correct date format.(DD-MM-YYYY)"});
                return false;
            }
        }

        if (this.state.contact.homepage && this.state.contact.homepage !== "" ) {
            if (!this.state.contact.homepage.match(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)
            ) {
                this.setState( {error :"Homepage can only correct web url format."});
                return false;
            }
        }
        this.setState({ error : null});
        return true;
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
        }else if (e.target.name === 'birthday') {
            co.birthday = e.target.value;
        }else if (e.target.name === 'homepage') {
            co.homepage = e.target.value;
        }else if (e.target.name === 'note') {
            co.note = e.target.value;
        }
        this.setState({contact: co, error: null});
    }

    handleComplete = (e) => {
        e.preventDefault();
        this.props.setFinished(this.props.conatctToEdit);
    }

    submitAvatar = (id) =>{
        let data = new FormData();
        data.append('file', this.state.tmpImagFile, id);
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
            console.log( "Upload image failed. error :" + error)
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.handleValidation()){
            return ;
        }

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
                        this.submitAvatar(this.state.contact.id);
                    }
                    this.props.setFinished(res.data);
                });

        }
    }

    uploadedAvatar = (file) => {
        this.setState({ tmpImagFile: file});
    }

    render() {

        let addeditButton;
        if(this.props.conatctToEdit) {
            addeditButton =  <button onClick={this.handleSubmit}>Edit</button>;
        } else {
            addeditButton =  <button onClick={this.handleSubmit}>Add</button>;
        }
        let errorstatus;
        if(this.state.error!=null){
            errorstatus = <label className="error">Format error: {this.state.error} </label>;
        }
        return (
            <div className="ContactEditForm">
                <div className="edit-form">
                    <form onSubmit={this.handleSubmit} className="edit-form">
                        <Avatar contactId={this.state.contact.id} setImageFile={this.uploadedAvatar}></Avatar>
                            <div>First Name: <input name={"firstName"} type={"text"} value={this.state.contact.firstName}
                                                    onChange={this.onChangeForm} placeholder="First name*"
                                                    required /></div>
                            <div>Last Name: <input name={"lastName"} type={"text"} value={this.state.contact.lastName}
                                                   onChange={this.onChangeForm} placeholder="Last name"/></div>
                            <div>---Phone numbers---</div>
                            <div>Home: <input name={"homePhone"} type={"text"} value={this.state.contact.homePhone}
                                              onChange={this.onChangeForm}/></div>
                            <div>Mobile: <input name={"mobilePhone"} type={"text"} value={this.state.contact.mobilePhone}
                                                onChange={this.onChangeForm} /></div>
                            <div>Company: <input name={"officePhone"} type={"text"} value={this.state.contact.officePhone}
                                                onChange={this.onChangeForm} />
                            </div>
                            <div className="line"></div>
                            <div>Address: </div>
                            <div>
                                <textarea className="moreInfo"  name={"address"} type="text" value={this.state.contact.address}
                                           onChange={this.onChangeForm} />
                            </div>
                            <div>
                                <div>Birthday: <input name={"birthday"} type={"text"} value={this.state.contact.birthday}
                                                    onChange={this.onChangeForm} placeholder="DD-MM-YYYY" className="date-input"/></div>
                                <div>Homepage: <input name={"homepage"} type={"text"} value={this.state.contact.homepage}
                                                     onChange={this.onChangeForm} placeholder="http://" />
                                </div>
                                <div>Note: </div>
                                <div>
                                        <textarea className="moreInfo"  name={"note"} type="text" value={this.state.contact.note}
                                          onChange={this.onChangeForm} />
                                </div>
                                <button onClick={this.handleComplete}>Cancel</button>
                                {addeditButton}
                                <div>
                                    {errorstatus}
                                </div>
                            </div>
                    </form>
                </div>
            </div>
        )

    }

}
export default ContactEditForm;
