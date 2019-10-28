import React, { Component } from "react";
import PropTypes from "prop-types";
import EmojiPicker from "emoji-picker-react";

class ChatInput extends Component {
  static propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
  };
  state = {
    message: "",
  };

  render() {
    return (
      <React.Fragment>
        <form
          className="chatInput"
          action="."
          onSubmit={e => {
            e.preventDefault();
            this.props.onSubmitMessage(this.state.message);
            this.setState({ message: "" });
          }}
        >
          <input
            type="text"
            placeholder={"Enter message..."}
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
          />
          <input type="submit" value={"Send"} />
        </form>
      </React.Fragment>
    );
  }
}

export default ChatInput;
