import React, { Component } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import EmojiPicker from "emoji-picker-react";

const URL = "ws://" + window.location.host + "/nb-ws/";

class Chat extends Component {
  state = {
    name: "Pepe",
    messages: [],
  };

  ws = new WebSocket(URL);

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
    };

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data);
      this.addMessage(message);
    };

    this.ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      });
    };
  }

  addMessage = message => this.setState(state => ({ messages: [...state.messages, message] }));

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { name: this.state.name, message: messageString };
    this.ws.send(JSON.stringify(message));
    this.addMessage(message);
  };
  myCallback(code) {
    debugger;
    const emoji = String.fromCodePoint(`0x${code}`);
    ChatInput.value += ` ${emoji}`;
  }
  render() {
    return (
      <div className="chat">
        <label htmlFor="name">
          Name:&nbsp;
          <input
            type="text"
            id={"name"}
            placeholder={"Enter your name..."}
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </label>
        <div className="divChatMessage">
          {this.state.messages.map((message, index) => (
            <ChatMessage key={index} message={message.message} name={message.name} />
          ))}
        </div>

        <ChatInput ws={this.ws} onSubmitMessage={messageString => this.submitMessage(messageString)}>
          {}
        </ChatInput>
        <EmojiPicker onEmojiClick={this.myCallback} />
      </div>
    );
  }
}

export default Chat;
