import React, { Component } from 'react';
import axios from "axios";
import Avatar from "./Avatar";

class Contact extends Component {

    handleSelect = (e) => {
        e.preventDefault();
        console.log("child call");
        console.log(this.props.contact);
        this.props.setSelected(this.props.contact);
    }
    render (){
        const co = this.props.contact;
        if (this.props.isListItem) {
            return (
                <div key={co.id} className="contact" >
                    <div className="row" onClick={this.handleSelect} >{co.firstName} {co.lastName}</div>
                </div>
            );
        }else{
            return (
                <div key={co.id} className="contact" >
                    <Avatar contactId={co.id} imageBase64={this.props.imageBase64} setImageFile={this.uploadedAvatar}></Avatar>
                    <div className="row">First name: {co.firstName}</div>
                    <div className="row">Last name: {co.lastName}</div>
                    <div className="row">Home: {co.homePhone}</div>
                    <div className="row">Mobile: {co.mobilePhone}</div>
                    <div className="row">Company: {co.officePhone}</div>
                    <div className="row">Address: {co.address}</div>
                </div>
            );
        }
    }
}

export default Contact;
