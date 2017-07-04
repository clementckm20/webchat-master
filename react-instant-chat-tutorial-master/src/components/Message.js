import React from 'react';
import FormattedRelativeDate from 'react-npm-formatted-relative-date';


// This component displays an individual message.
// We should have logic to display it on the right if the user sent the
// message, or on the left if it was received from someone else.
class Message extends React.Component {

  render() {
    // Was the message sent by the current user. If so, add a css class
    const fromMe = this.props.fromMe ? 'from-me' : '';



    return (

      <div className={`message ${fromMe}`}>
          <div className="message-username">
            {this.props.username}
          </div>
          <div className="message-username">
            <FormattedRelativeDate date={this.props.timestamp} />
          </div>
          <div className='message-body'>
            { this.props.message }
          </div>
        </div>

    );
  }
}

Message.defaultProps = {

};

export default Message;
