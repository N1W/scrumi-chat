import React from'react';
import ReactDOM from'react-dom';
import PropTypes from'prop-types';
import Message from'./Message.jsx';
import api from'../utils/api.js';


class MessageContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			allUsers: [],
			messages: []
		};
	}
	componentWillMount(){
		var that = this;
		api.getUsersRequest(function(result){
			that.setState(function(){
				return {
					allUsers: result
				}
			});
		});
		setInterval(function() {
			api.getUsersRequest(function(result){
				that.setState(function(){
					return {
						allUsers: result
					}
				});
			});
		}, 60000);

	}
	scrollToBottom(){
			const node = ReactDOM.findDOMNode(this.messagesEnd);
			if(node !== null ){
				node.scrollIntoView({ behavior: "smooth" });	
			}
	}	

	componentDidUpdate(){
		if(this.props.allMessages.length !== this.state.messages.length){
			this.setState(function(){
				return {
					messages: this.props.allMessages
				}
			});
			this.scrollToBottom();
		}
	}
	 getSenderName(id){
	 	for (var i = 0; i < this.state.allUsers.length; i++){
	 		if(id == this.state.allUsers[i].id){
	 			return this.state.allUsers[i].name;
	 		}
	 	}
	 }
	 getSenderAvatar(id){
	 	for (var i = 0; i < this.state.allUsers.length; i++){
	 		if(id == this.state.allUsers[i].id){
	 			return this.state.allUsers[i].avatar;
	 		}
	 	}
	 }
	 getMyMessage(id){
	 	if(id == this.props.userId){
	 		return "true";
	 	}
	 }
	render () {
		var that = this;
		var finalArr = [];
		this.props.allMessages.map(function (repo, index) {
			finalArr.push(<Message key={index + 1}
							newMessage={repo.messageText}
							messTime={repo.messageTime}
							senderName={that.getSenderName(repo.senderId)}
							senderAva={that.getSenderAvatar(repo.senderId)}
							userId={that.getMyMessage(repo.senderId)}
							ref={(el) => { that.messagesEnd = el; }} />);
		})
		return(
			<main className="m-message__container">
				{finalArr}
			</main>
		)
	}
}

export default MessageContainer;

	