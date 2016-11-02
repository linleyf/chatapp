import React, {Component} from 'react';


class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {aMessage: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);

  }

  handleChange(event) {
      this.setState({aMessage: event.target.value});
  }

  handleSubmit(event) {
    if (event.key === 'Enter') {
        this.props.changeHandler(this.state.aMessage); //this.state.aMessage is a string containing the message content
        event.target.value ="";
      }

  }

  render() {
    console.log(this.props.currentUser)
    return (
      <footer>
          <input id="username"
            type="text" placeholder="Your Name (Optional)"
            value={this.props.currentUser.name} />
          <input
            id="new-message"
            type="text"
            placeholder="Type a message and hit ENTER"
            value={this.state.aMessage}
            onChange={this.handleChange}
            onKeyDown={this.handleSubmit} />
      </footer>
    );
  }
}
export default ChatBar;
