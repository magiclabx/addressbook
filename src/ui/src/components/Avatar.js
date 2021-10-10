import React, {Component} from "react";

class Avatar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgUrl : "",
            desc  : ""
        }
    }


    render(){
        return(
            <img className="avatar" src={this.state.imgUrl} alt={this.state.desc} />
        );
    }
}

export default Avatar;