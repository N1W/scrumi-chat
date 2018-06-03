import React from 'react';
import Main from './Main';
import Footer from './Footer';
import Sidebar from './Sidebar';
import './index.scss';
import xhr from './utils/xhr.js';

class Chat extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			receiver: 0,
			name: "Общий чат",
			private: 0,
			notification:[],
			userid: null
		};
		this.updateReceiver = this.updateReceiver.bind(this);
	}

	// updateId(){
	// 	this.setState(function(){
	// 		return {
	// 			userid: newId
	// 		}
	// 	});
	// }

	updateReceiver(r, n, p){
		this.setState(function(){
			return {
				receiver: r,
				name: n,
				private: p
			}
		});
	}

	componentDidMount(){
		var that = this;
		xhr.logInn(function(result){
			that.setState(function(){
				return{
					userid: result.id
				}
			});
		});
	}

	render() {
		return(
			<div className="m-body">
				<main className="m-main m-main--right active">
					<Sidebar newRec={this.updateReceiver} userid={this.state.userid}
					chanelName={this.state.name}/>
					<Main receiver={this.state.receiver}
					headername={this.state.name}
					rId={this.state.receiver}
					ptivatestatus={this.state.private}
					/>
				</main>
				<Footer />
			</div>
		)
	}
}

export default Chat;