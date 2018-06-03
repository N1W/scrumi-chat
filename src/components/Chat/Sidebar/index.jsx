import React from 'react';
import PropTypes from'prop-types';
import api from '../utils/api.js';
import xhr from '../utils/xhr.js';

function Channels(props) {
	return(
		<section className="m-aside__channels">
			<h2>Каналы</h2>
				<div className="m-channels">
				<h3>Темы</h3>
					<ul>
						<li
							onClick={props.updReceiver.bind(null, 0, "Общий чат", 0)}
							className={props.activeChanel === "Общий чат" ? "active" : null}
							style={'Java' === props.selectedRoom ? {background: 'grey'} : null}
							key={'Java'}>
							<a href="#" className="m-unread ">99</a># Общий чат
						</li>
					</ul>
				</div>
		</section>
	);
}

function SelectTab(props) {
	return(
			<ul className="m-aside__tabs">
				<li
					className={'contacts' === props.selectedTab ? 'active' : null}
					key={'contacts'}
					onClick={props.onState.bind(null, props.selectedRoom)}>
					<a href="#" className="m-members__ico">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 69" width="33px" height="50px">
							<g>
								<g>
									<path className="m-members__ico"
									d="M33.42,50.44c-.07-.6.24-1.45,1.39-2.63C26.59,41.86,23.55,27.47,29,12.21a12.09,12.09,0,0,0-2-.24S11.6,12,11.6,31.88c0,11.69,4.83,12.94,7.73,15.92s0,4,0,4S0,51.78,0,63.73H12.12C16.61,52.06,30.16,50.19,33.42,50.44Zm47.25,1.35s-2.9-1,0-4,7.73-4.23,7.73-15.92C88.4,12,72.93,12,72.93,12a12.09,12.09,0,0,0-2,.24c5.5,15.26,2.45,29.65-5.76,35.59,1.15,1.18,1.46,2,1.39,2.63,3.26-.25,16.81,1.62,21.29,13.29H100C100,51.78,80.66,51.78,80.66,51.78ZM59.9,53.08s-3.87-1.33,0-5.31,10.31-5.64,10.31-21.23C70.22,0,49.59,0,49.59,0S29,.17,29,26.54c0,15.92,6.12,16.92,10.31,21.23s0,5.31,0,5.31S13.5,53.08,13.5,69H85.68C85.68,53.08,59.9,53.08,59.9,53.08Z"></path>
								</g>
							</g>
						</svg>
					</a>
				</li>
				<li
					className={'pinned' === props.selectedTab ? 'active' : null}
					key={'pinned'}
					onClick={props.clickesButton.bind(null, 'pinned')}>
					<a href="#" className="m-pinned__ico">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79 100" width="23px" height="50px">
							<g>
								<g>
									<path className="m-pinned__ico"
									d="M39.5,0C17.68,0,0,18,0,40.1S39.5,100,39.5,100,79,62.25,79,40.1,61.32,0,39.5,0ZM30.91,75.86c9.62-4.66,8.71-9.93,6.87-10.34C26.12,62.88,13.65,55,13.65,38.86S26,13.79,41.22,13.79s23.59,9.34,24,24.14S51.32,75.86,30.91,75.86ZM27.48,48.28H44.65V44.83H27.48Zm0-6.9H55V37.93H27.48Zm0-6.9H55V31H27.48Z"></path>
								</g>
							</g>
						</svg>
					</a>
				</li>
				<li
					className={'docs' === props.selectedTab ? 'active' : null}
					key={'docs'}
					onClick={props.clickesButton.bind(null, 'docs')}>
					<a href="#" className="m-docs__ico">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86 100" width="22px" height="50px">
							<g>
								<g>
									<path className="m-docs__ico"
									d="M15.64,3.85h43L54.73,0H15.64S0-.1,0,15.38V76.92l3.91,3.85V15.38S3.22,3.85,15.64,3.85Zm7.82,7.69h43L62.55,7.69H23.45S7.82,7.59,7.82,23.08V84.62l3.91,3.85V23.08S11,11.54,23.45,11.54ZM74.27,38.46A11.63,11.63,0,0,1,62.55,26.92V15.38H27.36A11.63,11.63,0,0,0,15.64,26.92V88.46A11.63,11.63,0,0,0,27.36,100H74.27A11.63,11.63,0,0,0,86,88.46v-50H74.27ZM66.34,26.81l8,7.86L86,34.62,66.45,15.38Z"></path>
								</g>
							</g>
						</svg>
					</a>
				</li>
			</ul>
	);
} 

function Contacts (props) {
	var indents = [];			
	if(props.users.length !== 0){
		for(var i = 0; i < props.users.length; i++){ 
			var notific = 0;
			for(var j = 0; j < props.noti.length; j++){
				if(props.noti[j].senderId == props.users[i].id){
					// console.log(props.users[i].userId, 'num ', props.noti[j].messages);
					notific = props.noti[j].messages;
				} 
			}
			if (notific > 0){
				indents.unshift(<li key={i} className={props.users[i].status === 1 ? "popular-item" : "popular-item off"} onClick={props.updReceiver.bind(null, props.users[i].id, props.users[i].name, 1) }>
				<a href="#" className="m-unread active" className={notific > 0 ? 'm-unread active' : 'm-unread'}>{notific}</a>
				<div className="avatar-s">
				<a href="#">
				<span className={props.users[i].status === 1 ? "status" : null}></span>
				<img src={props.users[i].avatar}
				alt="avatar" />
				</a>
				</div>
				<div className="m-member">
				{props.users[i].name}
				{	props.users[i].status === 0 
						?	<p className="m-member__visit">
							<time> {props.users[i].datetime}</time>
							</p>
						: 	<p></p>
				}
				</div>
				</li>);  
			} else{
				indents.push(<li key={i} className='popular-item' onClick={props.updReceiver.bind(null, props.users[i].id, props.users[i].name, 1) }>
				<a href="#" className="m-unread active" className={notific > 0 ? 'm-unread active' : 'm-unread'}>{notific}</a>
				<div className="avatar-s">
				<a href="#">
				<span className={props.users[i].status === 1 ? "status" : null}></span>
				<img src={props.users[i].avatar}
				alt="avatar" />
				</a>
				</div>
				<div className="m-member">
				{props.users[i].name}
				{	props.users[i].status === 0
						?	<p className="m-member__visit">
							<time> {props.users[i].datetime}</time>
							</p>
						: 	<p></p>
				}
				</div>
				</li>);  
			}
		}
	}

  return (
  	<section className="m-aside__members">
  	<h2>Контакты ({indents.length})</h2>
    <ul className='m-members'>
    	{indents}
    </ul>
    </section>
  )
}

function Pinned (props) {
	return (
		<div className="m-aside__tab-content">
			<h2>Прикреплённые сообщения</h2>
			<ul  className="pinned">
			</ul>
		</div>
	)
}

function Docs (props) {
	var i = 0;
	return (
		<div className="m-aside__tab-content">
			<h2>Файлы</h2>
				<input type="file" name="afile" id="afile" accept="*/*"			
				onChange={(event)=> { props.upFile(event.target.files[0])}} />
			{props.files.map(function(item){
				return(
					<div key={i++}>
						<a href={item}>{item.substring(5)}</a>
					</div>
				)
			})}
		</div>
	)
}

SelectTab.propTypes = {
	selectedTab: PropTypes.string.isRequired,
	selectedRoom: PropTypes.string.isRequired,
	onState: PropTypes.func.isRequired,
}

class Sidebar extends React.Component{
	constructor(props){
		super();
		this.state = {
			selectedRoom: 'All',
			selectedTab: 'contacts',
			repos: null,
			users: [],
			files: [],
			receivers: null,
			username: null,
			notification: [],
			newstatus: 0,
		};
		this.updateTab = this.updateTab.bind(this);
		this.updateRoom = this.updateRoom.bind(this);
		this.updateFile = this.updateFile.bind(this);
		this.newReceiver = this.newReceiver.bind(this);
	}
	getNotifiction(){
		var that = this;
		setInterval(function() {
			xhr.getPrivate(that.props.userid, function(result){
				that.setState(function(){
					return {
						notification: result
					}
				});
			});
		}, 1000);
	}
	getEnterUsers(){
		var that = this;
		api.getUsersRequest(function(result){
			that.setState(function(){
				return {
					users: result
				}
			});
		});
	}
	getUsers(){
		var that = this;
		setInterval(function() {
		api.getUsersRequest(function(result){
			that.setState(function(){
            return {
              users: result
            }
          });
		});
	}, 60000);
	}
	getFiles(){
		var that = this;
		setInterval(function() {
		xhr.getFile(function(result){
			var filesArr = [];
			for(var i = 0; i < result.length; i++){
				filesArr.push(result[i]);
			}
			that.setState(function(){
				return{
					files: filesArr
				}
			});
		});
	}, 1500);
	}
	componentDidMount() {
		this.updateRoom(this.state.selectedRoom);
		this.updateFile(this.state.files);
		this.getEnterUsers();
		this.getUsers();
		this.getFiles();
		this.getNotifiction();
	}
	updateFile(file){
		xhr.sendFile(file, 'doc');
	}
	updateTab(tab){
			this.setState(function(){
				return {
					selectedTab: tab,
					repos: null,
				}
		});
	}
	newReceiver(r, n, p){
		this.setState(function(){
			return {
				receivers: r,
				username: n,
				newstatus: p,
			}
		});
	}
	updateRoom(room){
		this.setState(function(){
			return {
				selectedTab: 'contacts',
				selectedRoom: room,
				repos: null,
			}
		});
	}
	render () {
		return(
			<aside className="m-aside">
				<SelectTab 
					selectedRoom={this.state.selectedRoom}
					selectedTab={this.state.selectedTab} 
					onState={this.updateRoom}
					clickesButton={this.updateTab}
				/>
				{this.state.selectedTab ==='contacts'
					?	 <section className="m-aside__container">
								<Contacts repos={this.state.repos}
								users={this.state.users}
								updReceiver={this.props.newRec}
								noti={this.state.notification} />
								<Channels 
									updReceiver={this.props.newRec}
									selectedRoom={this.state.selectedRoom} 
									onState={this.updateRoom}
									activeChanel={this.props.chanelName}
								/>
							</section>
							
					:   this.state.selectedTab ==='pinned'
							? <Pinned />
							: <Docs 
								upFile={this.updateFile}
								files={this.state.files}
							/>
				}
			</aside>
		)
	}
}

export default Sidebar;