import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws://www.localhost:4000");
    this.addMessage = this.addMessage.bind(this);
    this.newName = this.newName.bind(this);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      socket: {}
    }
  }

  addMessage(newMessage) {
    let id = this.state.messages.length +1;
    let username = this.state.currentUser.name;
    let content = newMessage;
    let newMessageObject = {
      id: id,
      username: username,
      content: content,
      type: "postMessage"
    };
    this.socket.send(JSON.stringify(newMessageObject));
  }

  newName(username) {
    let oldName = this.state.currentUser.name;
    let postNotification = {
      type: "postNotification",
      content: oldName + ' changed their name to ' + username
    };

    this.socket.send(JSON.stringify(postNotification));
    this.setState({currentUser: {name: username}});
  }

  printMessage(id, username, content) {
    let incomingMessage = {id: id, username: username, content: content};
    let messages = this.state.messages.concat(incomingMessage);
    this.setState({messages: messages});
  }

  //create what do I do when when a mesage comes in?
  //What should I do when a name changes?
  //printNotification function (similiar to printMessage)

  printNotification(content) {
    let usernameChange = content
    let newname =  this.state.messages.concat({notification: usernameChange}); 
    this.setState({messages: newname});
  }


  componentDidMount() {
  console.log("componentDidMount <App />");

    this.socket.onopen = function (event) {
      console.log("probably connected to server");
    };

    this.socket.onmessage = (event) => {
      let message = JSON.parse(event.data);
      let type = message.type      
      let id = message.id;
      let username = message.username;
      let content = message.content;
      console.log("here is type", type)

      if (type === "incomingMessage") {
        this.printMessage(id, username, content);
      } else if (type === "incomingNotification") {
      
      this.printNotification(content);

      }

    };

   //2) THIS.SOCKET.SOMETHING function simliar to onmessage
    

 



  }


  render() {
     console.log(this.state)
     return (
       <div className="wrapper">
         <nav>
           <h1>Chatty</h1>
         </nav>
            <MessageList messages={this.state.messages}></MessageList>
            <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage}
              newName={this.newName} socket={this.socket}></ChatBar>
        </div>
     );
   }


}



export default App;
