import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws://www.localhost:4000");
    this.addMessage=this.addMessage.bind(this);
      this.state = {
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [],
        socket: {}
      }
  }

  componentDidMount() {
  console.log("componentDidMount <App />");

    this.socket.onopen = function (event) {
    console.log("probably connected to server");
    };

  }

  addMessage(newMessage) {
    let id = this.state.messages.length +1;
    let username = this.state.currentUser.name;
    let content = newMessage;
    let newMessageObject = {
      id: id,
      username: username,
      content: content
    };

  this.socket.send(JSON.stringify(newMessageObject));

  // let messages =this.state.messages.concat(newMessageObject)
  // this.setState({messages: messages});
  // console.log(this.state);
  }


  render() {
     console.log(this.state)
     return (
       <div className="wrapper">
         <nav>
           <h1>Chatty</h1>
         </nav>
            <MessageList messages={this.state.messages}></MessageList>
            <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} socket={this.socket}></ChatBar>
        </div>
     );
   }


}



export default App;
