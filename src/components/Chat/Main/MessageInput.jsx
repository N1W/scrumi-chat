import React from 'react';
import PropTypes from 'prop-types';
import xhr from '../utils/xhr.js';

class MessageInput extends React.Component{
	constructor(props){
		super(props);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	handleKeyPress(event){
		if(event.key == 'Enter'){
			event.preventDefault();
			console.log(this.messageText.value);
			xhr.sendSMSRequest(this.props.userId, this.messageText.value, this.props.reseiverId, this.props.ptivatestatus);
			this.messageText.value = "";
		}
	}
	render () {
		return(
		<form className="m-message__send">
            <textarea name="send" id="send" 
            ref = {item => {this.messageText = item; }}
            onKeyPress={this.handleKeyPress}></textarea>
            <a href="#" className="circle-button-s">T.</a>
         </form>
		)
	}
}

export default MessageInput;