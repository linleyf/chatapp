import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering MessageList");
    return (
      <div id="message-list">
        {
          //loop
          this.props.messages.map((message) => {
            return <Message key={message.id} MessageObj={message} />;
          })
        }
      </div>
    );
  }
}
export default MessageList;
