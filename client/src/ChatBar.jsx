import React, {Component} from 'react';


class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {aMessage: ''};
    this.state = {name: ''};
    this.handleChangemessage = this.handleChangemessage.bind(this);
    this.handleSubmitmessage = this.handleSubmitmessage.bind(this);
    this.handleChangename = this.handleChangename.bind(this);
    this.handleSubmitname = this.handleSubmitname.bind(this);

  }

  handleChangemessage(event) {
    this.setState({aMessage: event.target.value});
  }

  handleSubmitmessage(event) {
    if (event.key === 'Enter') {
        this.props.addMessage(this.state.aMessage); //this.state.aMessage is a string containing the message content
        this.setState({aMessage: ""});
      }
  }

  handleChangename(event) {
      this.setState({name: event.target.value});
  }

  handleSubmitname(event) {
    if (event.key === 'Enter') {
        this.props.newName(this.state.name);
      }
  }

  render() {
    console.log(this.props.currentUser)
    return (
      <footer>
          <input id="username"
            type="text" placeholder="Your Name (Optional)"
            value={this.state.name}
            onChange={this.handleChangename}
            onKeyDown={this.handleSubmitname}
            />
          <input
            id="new-message"
            type="text"
            placeholder="Type a message and hit ENTER"
            value={this.state.aMessage}
            onChange={this.handleChangemessage}
            onKeyDown={this.handleSubmitmessage} />
      </footer>
    );
  }
}
export default ChatBar;
