import React from 'react';
import MessageInput from './MessageInput.jsx';
import RoomHeader from './RoomHeader.jsx';
import MessageContainer from './MessageContainer.jsx';
import api from '../utils/api.js';
import xhr from '../utils/xhr.js';

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      myid: null,
      receiver: null
    };
  }

  updateReceiver(receiver){
    this.setState(function(){
      return {
        receiver: receiver,
      }
    });
  }

  getSMS(){
    var that = this;
    setInterval(function() {
      xhr.getSMSRequest(that.state.myid, that.props.rId, that.props.ptivatestatus, function(result){
      
        if(result.length !== that.state.messages.length){
          that.setState(function(){
            return {
              messages: result
            }
          });
        }
      });
    }, 700);
  }

  getId(){
      var newId = localStorage.getItem("id");
      this.setState(function(){
        return {
          myid: newId
        }
      });
  }

  componentDidMount(){
    this.getId();
    this.getSMS();
    console.log("betaV 1.1.7");
  }



  render () {
    return(
         <section className="m-main__container">
            <RoomHeader 
            headername = {this.props.headername}/>
            <MessageContainer 
              allMessages={this.state.messages}
              userId={this.state.myid}
            />
            <MessageInput
              reseiverId={this.props.receiver}
              userId={this.state.myid}
              ptivatestatus={this.props.ptivatestatus} />
         </section>
    )
  }
}

export default Main;