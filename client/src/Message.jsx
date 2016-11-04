import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message />");
	    return (
	      <div className="message">
	      	<div className="message system">{this.props.MessageObj.notification}</div>
	        <span className="username"><b>{this.props.MessageObj.username}</b></span>
	        <span className="content">{this.props.MessageObj.content}</span>
	      </div>
	    );
    
  }
}
export default Message
