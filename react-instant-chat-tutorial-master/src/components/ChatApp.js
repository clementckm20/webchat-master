require('../styles/ChatApp.css');


import React from 'react';
import io from 'socket.io-client';
import config from '../config';

import Messages from './Messages';
import ChatInput from './ChatInput';
import Username from './Username';

class ChatApp extends React.Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [], userJoined:[], chatHistory:[] };
    this.sendHandler = this.sendHandler.bind(this);



    // Connect to the server
    this.socket = io(config.api, { query: 'username = {this.props.username}' }).connect();
    this.socket.emit('client:userJoined',this.props.username);

    // receive chatHistory from server
    this.socket.on('server:chatHistory', docs => {
      this.addHistory(docs);
    });
    // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });

    // Listen for userJoined from the server
    this.socket.on('server:userJoined', user => {
      this.addUser(user);
    });


  }




  sendHandler(message) {
    //get login time

    const sentTime = new Date();

    const messageObject = {
      username: this.props.username,
      timestamp: sentTime,
      message
    };

    // Emit the message to the server
    this.socket.emit('client:message', messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);

  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ message: messages });
  }

  addUser(user){
    //Add user to component state
    const userJoined = this.state.userJoined;
    userJoined.push(user);
    this.setState({user:userJoined});
  }

  addHistory(docs){
    // Add chatHistory to the chat box
    const chatHistory = this.state.chatHistory;
    chatHistory.push(docs);
    this.setState({ docs: chatHistory });
  }

  render() {
    //get login time
    const Timestamp = require('react-timestamp');
    const currentTime = new Date();

    return (
      <div className="container">
        <h3>Web Chat
        <p>Welcome {this.props.username} </p>
        <p>Login Time: <Timestamp time={currentTime} format='full' />
        </p>
        See history {JSON.stringify(this.state.chatHistory)}
        <Username userJoined={this.state.userJoined} />

        </h3>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    );
  }

}
ChatApp.defaultProps = {
  username: 'Anonymous'
};

export default ChatApp;
