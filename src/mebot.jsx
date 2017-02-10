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
const defaultBubbleStyle = {
    text: {
        fontSize: 30,
        fontFamily: 'Helvetica'
    },
    chatbubble: {
        borderRadius: 70,
        padding: 40
    }
}

const defaultTextBoxStyle = {
    fontSize: "30px",
    width: "96vw",
    position: "absolute",
    bottom: "2vh",
    height: "12vh",
    paddingLeft: "10px",
    paddingRight: "10px",
    color: "#404040"
}

class WitAIChatFeed extends React.Component {

  constructor(props) {
    debugger;
    super(props);
    var newBubbleStyles = defaultBubbleStyle;
    var newTextBoxStyles = defaultTextBoxStyle;
    if (props.bubbleStyles !== undefined){
        newBubbleStyles = props.bubbleStyles;
    }

    if (props.textBoxStyle !== undefined){
        newBubbleStyles = props.bubbleStyles;
    }
    this.state = {
        apiKey: props.apiKey,
        messages: initialMessages,
        bubbleStyles: newBubbleStyles,
        textBoxStyle: newTextBoxStyles
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
            bubbleStyles={self.state.bubbleStyles}
        />
        <input type="text" style={self.state.textBoxStyle}/> 
        </div>
    );
  }
}

ReactDOM.render(
    <WitAIChatFeed apiKey="CKNRVMTUDFMPFLIYGUY2NS5B6CA3MSYH" />,
    document.getElementById('mebot-root')
);