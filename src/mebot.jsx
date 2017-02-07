import React from 'react';
import ReactDOM from 'react-dom';
import { ChatFeed } from 'react-chat-ui';
import { axios } from 'axios';

const messages = [
    { type: 1, message: "I'm the recipient! (The person you're talking to)" }, // Gray bubble
    { type: 0, message: "I'm the user!" }, // Blue bubble
];

const isTyping = false;

class WitAIChatFeed extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <ChatFeed
            messages={messages} // Boolean: list of message objects
            isTyping={isTyping} // Boolean: is the recipient typing
            hasInputField={false} // Boolean: use our input, or use your own
            bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
            // JSON: Custom bubble styles
            bubbleStyles={
                {
                    text: {
                        fontSize: 30
                    },
                    chatbubble: {
                        borderRadius: 70,
                        padding: 40
                    }
                }
            }
        />
    );
  }
}

ReactDOM.render(
    <WitAIChatFeed/>,
    document.getElementById('mebot-root')
);