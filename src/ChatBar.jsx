import React, {Component} from 'react';


class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {newMessage: 'gfh'};
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
      this.setState({newMessage: event.target.value});
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
            value={this.state.newMessage}
            onChange={this.handleChange} />
      </footer>
    );
  }
}
export default ChatBar;
