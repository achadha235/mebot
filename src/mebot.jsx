import React from 'react';
import ReactDOM from 'react-dom';
import {ChatFeed} from 'react-chat-ui';
import {WitAI} from './wit';
import {axios} from 'axios';

const initialMessages = [];
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
    color: "#404040",
    outline: "none"
}

class WitAIChatFeed extends React.Component {

    constructor(props) {
        debugger;
        super(props);
        var newBubbleStyles = defaultBubbleStyle;
        var newTextBoxStyles = defaultTextBoxStyle;
        if (props.bubbleStyles !== undefined) {
            newBubbleStyles = props.bubbleStyles;
        }

        if (props.textBoxStyle !== undefined) {
            newBubbleStyles = props.bubbleStyles;
        }
        this.state = {
            apiKey: props.apiKey,
            messages: initialMessages,
            bubbleStyles: newBubbleStyles,
            textBoxStyle: newTextBoxStyles,
            currentComposedMessage: ""
        };

        this.startChat();
    }

    startChat() {
        this.witApi = new WitAI({apiKey: this.state.apiKey});
    }

    onDidRecieveUpdate(data) {
        console.log("Got a callback from Wit AI");
    }

    sendMessage() {
        var self = this;
        self.messages.push({
            
        })
        self
            .witApi
            .converse((response) => {
                console.log(response);
            });
    }

    handleKeyPress(event) {
        var self = this;
        switch (event.key) {
            case 'Enter':
                alert("Entered pressed");
                self.sendMessage();
                break;
            default:
                if (event.target.value !== self.state.currentComposedMessage) {
                    self.setState({currentComposedMessage: event.target.value});
                    console.log(this.state.currentComposedMessage);
                }
                break;
        }
    }

    handleInputChanged(event) {
        var self = this;
        self.setState({currentComposedMessage: event.target.value});
        console.log(this.state.currentComposedMessage);
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
                    bubbleStyles={self.state.bubbleStyles}/>
                <input
                    type="text"
                    style={self.state.textBoxStyle}
                    onKeyDown={self
                    .handleKeyPress
                    .bind(self)}
                    onChange={self
                    .handleInputChanged
                    .bind(self)}/>
            </div>
        );
    }
}

ReactDOM.render(
    <WitAIChatFeed apiKey="CKNRVMTUDFMPFLIYGUY2NS5B6CA3MSYH"/>, document.getElementById('mebot-root'));