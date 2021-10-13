import React, {Component} from "react";
import axios from "axios";

class Avatar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null,
            fileName: null
        };
        this.loadImageBase64 = this.loadImageBase64.bind(this);
    }

    loadImageBase64 = (id, callback) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://localhost:8080/api/contacts/contact/"+ id +"/avatar");
        xhr.responseType = 'blob';
        xhr.send();
        xhr.onload = function() {
            if (xhr.status === 200) {
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

    downloadAvatar = () => {
        if (this.props.contactId ) {
            this.loadImageBase64(this.props.contactId, (reader) => {
                console.log(reader);
                this.setState({image: reader});
            });
        }
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({ image: URL.createObjectURL(img)});
           if(this.props.setImageFile) {
               this.props.setImageFile(img);
           }
        }
    };

    render() {
        const defaultInfo = <h3>Select Image</h3>;
        this.downloadAvatar();
        let editIcons = () => {
            if( !this.props.viewable){
                let label = (!this.state.image )? <h3>Select Image</h3>:<div></div>;
                return <div> {label} <input type="file" name="avatar" onChange={this.onImageChange} /></div>
            }else{
                return <div></div>;
            }
        }
        return(
            <div className="avatar">
                <img className="display" src={this.state.image}/>
                    {editIcons()}
            </div>
        );
    }
}

export default Avatar;