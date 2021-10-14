import React, { Component } from 'react';
import Avatar from "./Avatar";

class Contact extends Component {

    handleSelect = (e) => {
        e.preventDefault();
        this.props.setSelected(this.props.contact);
    }
    render (){
        const co = this.props.contact;
        if (this.props.isListItem) {
            return (
                <div key={co.id} className="contact" >
                    <div className="item-div" onClick={this.handleSelect} >{co.firstName} {co.lastName}</div>
                </div>
            );
        }else{
            return (
                <div key={co.id} className="contact" >
                    <div className="imageArea">
                        <Avatar contactId={co.id} imageBase64={this.props.imageBase64} setImageFile={this.uploadedAvatar} viewable="true"></Avatar>
                    </div>
                    <div className="row">First name: {co.firstName}</div>
                    <div className="row">Last name: {co.lastName}</div>
                    <div className="row">Home: {co.homePhone}</div>
                    <div className="row">Mobile: {co.mobilePhone}</div>
                    <div className="row">Company: {co.officePhone}</div>
                    <div className="row">Address: {co.address}</div>
                    <div className="row">Birthday: {co.birthday}</div>
                    <div className="row">Homepage: {co.homepage}</div>
                    <div className="row">Note: {co.note}</div>
                </div>
            );
        }
    }
}

export default Contact;
