import React from 'react';
import ReactDOM from 'react-dom';
import { ChatFeed } from 'react-chat-ui';
import { WitAI } from './wit';
import { axios } from 'axios';

const initialMessages = [
    { type: 1, message: "I'm the recipient! (The person you're talking to)" }, // Gray bubble
    { type: 0, message: "I'm the user!" }, // Blue bubble
];

const isTyping = false;

class WitAIChatFeed extends React.Component {

  constructor(props) {
    debugger;
    super(props);
    this.state = {
        apiKey: props.apiKey,
        messages: initialMessages
    };
    this.startChat();
  }

  startChat(){
      this.witApi =  new WitAI({ apiKey: this.state.apiKey });
      this.witApi.converse({
          onRecieve: this.onDidRecieveUpdate
      });
  }

  onDidRecieveUpdate(data){
      console.log("Got a callback from Wit AI");
  }

  render() {
    let self = this;
    return (
        <div>
        <ChatFeed
            messages={self.state.messages}
            isTyping={true}
            hasInputField={false}
            bubblesCentered={false}
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
        <input type="text"/> 
        </div>
    );
  }
}

ReactDOM.render(
    <WitAIChatFeed apiKey="CKNRVMTUDFMPFLIYGUY2NS5B6CA3MSYH" />,
    document.getElementById('mebot-root')
);