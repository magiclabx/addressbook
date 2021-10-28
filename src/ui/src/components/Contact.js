import React, { Component } from 'react';
import Avatar from "./Avatar";

class Contact extends Component {

    handleSelect = (e) => {
        e.preventDefault();
        this.props.setSelected(this.props.contact);
    }

    getParsedDate(strDate){
        if(strDate == null) return "";
        let strSplitDate = String(strDate).split(' ');
        let date = new Date(strSplitDate[0]);
        let dd = date.getDate();
        let mm = date.getMonth() + 1; //January is 0!

        let yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        date = yyyy + "-" + mm + "-" + dd;
        return date.toString();
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
                    <div className="row">Birthday: {this.getParsedDate(co.birthday).toString()}</div>
                    <div className="row">Homepage: {co.homepage}</div>
                    <div className="row">Note: {co.note}</div>
                </div>
            );
        }
    }
}

export default Contact;
