import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.newMessage=this.newMessage.bind(this);
      this.state = {
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            id: 1,
            username: "Bob",
            content: "Has anyone seen my marbles?",
          },
          {
            id: 2,
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ],
        socket: {}
      }
  }

  componentDidMount() {
  console.log("componentDidMount <App />");
  // let newSocket = new WebSocket("ws://www.localhost:4000");
  // this.setState ({socket: newSocket});
  }
  newMessage(newMessage) {
    let id = this.state.messages.length +1;
    let username = this.state.currentUser.name;
    let content = newMessage;
    let newMessageObject = {
      id: id,
      username: username,
      content: content
    };

  let messages =this.state.messages.concat(newMessageObject)
  this.setState({messages: messages});
  console.log(this.state);
  }


  render() {
     console.log(this.state)
     return (
       <div className="wrapper">
         <nav>
           <h1>Chatty</h1>
         </nav>
            <MessageList messages={this.state.messages}></MessageList>
            <ChatBar currentUser={this.state.currentUser} changeHandler={this.newMessage}></ChatBar>
        </div>
     );
   }


}



export default App;
