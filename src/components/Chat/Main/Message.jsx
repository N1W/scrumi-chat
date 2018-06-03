import React from 'react';
import PropTypes from 'prop-types';

class Message extends React.Component{
	constructor(props){
        super(props);
    }
    render () {
        return(
            <div className={this.props.userId === "true" ? "m-message m-message--you" : "m-message"}>
                <div className="avatar-l">
                    <a href="#">
                        <span className="status"></span>
                        <img className="button-round--image"
                            src={this.props.senderAva}
                            alt="avatar"/>
                    </a>
                </div>
                <div className="m-message__content">
                    <div className="m-message__content-header">
                        <div className="m-message__sender-status">
                            <span>{this.props.senderName} </span>
                            в
                            <time>
                                 <span> {this.props.messTime} </span>
                            </time>
                            <ul className="m-message__editer">
                                <li className="ico-edit"></li>
                                <li className="ico-del"></li>
                                <li className="ico-pin"></li>
                            </ul>
                        </div>
                        <ul className="m-message__status">
                            <li><a href="#" className="ico-plus"></a></li>
                            <li><a href="#" className="ico-minus"></a></li>
                            <li><a href="#" className="ico-eq"></a></li>
                        </ul>
                        <div className="m-message__seen">

                        </div>
                    </div>
                    <div className="m-message__content-body">
                        <p className="m-content__text">{this.props.newMessage}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Message;