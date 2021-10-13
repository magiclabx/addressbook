import React, {Component} from "react";
import axios from "axios";

class Avatar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: null
        };
        this.loadImageBase64 = this.loadImageBase64.bind(this);
        this.loadImageToUrl = this.loadImageToUrl.bind(this);
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
                console.log(xhr.response);
            } else {
                // If it fails, reject the promise with a error message
                console.log('Image didn\'t load successfully; error code:' + xhr.statusText);
            }
        };
    }

    loadImageToUrl= (id) =>{
        return axios
            .get("http://localhost:8080/api/contacts/contact/"+ id +"/avatar", {
                responseType: 'arraybuffer'
            })
            .then(response => Buffer.from(response.data, 'binary').toString('base64'))
    }


    downloadAvatar = () => {
        if (this.props.contactId) {
            this.loadImageBase64(this.props.contactId, (reader) => {
                console.log(reader.size);
                this.setState({image: reader});
            });
            //let image = this.loadImageToUrl(this.props.contactId);
            //console.log(image);
            //this.setState( { image: URL.createObjectURL()} );
        }
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                image: URL.createObjectURL(img)
            })
           if(this.props.setImageFile) {
               this.props.setImageFile(img);
           }
        }
    };

    render(){
        const defaultInfo = <h3>Select Image</h3>;
        this.downloadAvatar();
        return(
            <div className="avatar">
                <img className="display" src={this.state.image}/>
                { !this.state.image? defaultInfo: <div></div> }
                <input type="file" name="avatar" onChange={this.onImageChange} />
            </div>
        );
    }
}

export default Avatar;