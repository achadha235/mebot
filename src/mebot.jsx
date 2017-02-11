import React from 'react';
import ReactDOM from 'react-dom';
import {ChatFeed} from 'react-chat-ui';
import {WitAI} from './wit';
import {axios} from 'axios';
require("./styles.css");

const guid =  () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

const initialMessages = [];
const isTyping = false;
const defaultBubbleStyle = {
    text: {
        fontSize: 30,
        fontFamily: 'Helvetica'
    },
    chatbubble: {
        borderRadius: 60,
        padding: 42
    }
}

const loadingStyle = {
    position: "fixed",
    bottom: "17vh",
    left: "73px"
}

const Loading = (props) => 
<div style={loadingStyle}>
    <div className="chat-bubble">
    <div className="loading">
        <div className="dot one"></div>
        <div className="dot two"></div>
        <div className="dot three"></div>
    </div>
    <div className="tail"></div>
    </div>
</div>;

const defaultTextBoxStyle = {
    fontSize: "30px",
    width: "96vw",
    position: "relative",
    bottom: "-1vh",
    height: "12vh",
    paddingLeft: "10px",
    paddingRight: "10px",
    color: "#404040",
    outline: "none"
}

const defaultTextBoxPlaceholder = "Type a message..."

class WitAIChatFeed extends React.Component {

    constructor(props) {
        super(props);
        var newBubbleStyles = defaultBubbleStyle;
        var newTextBoxStyles = defaultTextBoxStyle;
        var newTextBoxPlaceholder = defaultTextBoxPlaceholder;

        if (props.bubbleStyles !== undefined) {
            newBubbleStyles = props.bubbleStyles;
        }

        if (props.textBoxStyle !== undefined) {
            newBubbleStyles = props.bubbleStyles;
        }

        if (props.textBoxPlaceholder !== undefined) {
            var newTextBoxPlaceholder = props.textBoxPlaceholder;
        }

        const sessionId = guid();
        this.state = {
            apiKey: props.apiKey,
            messages: initialMessages,
            bubbleStyles: newBubbleStyles,
            textBoxStyle: newTextBoxStyles,
            textBoxPlaceholder: newTextBoxPlaceholder,
            currentComposedMessage: "",
            sessionId: sessionId
        };

        this.startChat();
    }

    startChat() {
        this.witApi = new WitAI({apiKey: this.state.apiKey});
    }

    onDidRecieveUpdate(data) {
    }

    messageRe

    sendMessage() {
        var self = this;
        var msg = self.state.currentComposedMessage;
        self
            .state
            .messages
            .push({type: 0, message: self.state.currentComposedMessage});
        self.setState({ currentComposedMessage: ""});
        self.scrollToBottom();
        //setTimeout(self.scrollToBottom, 100);
        this.textInput.value = "";

        self
            .witApi
            .converse(msg, self.state.sessionId , self.handleConversationResponse.bind(self));
    }

    handleConversationResponse (response){
        var self = this;
        if (response.data.type !== undefined &&  response.data.type == "msg"){
            self.messageRecieved(response.data.msg);
        }
    }

    showTypingFor(numberOfMs){
        var self = this;
        return new Promise((resolve, reject)=>{
            self.setState({
                isTyping: true
            })
            setTimeout(()=>{
                self.setState({
                    isTyping: false
                });
                resolve();
            }, numberOfMs);
        });
    }

    messageRecieved(message){
        var self = this;
        var numWords = message.split(" ").length;
        var messageTypingLengthFactor = 300;
        var showTypingLength = Math.min(messageTypingLengthFactor * message.length, 2300);

        self.scrollToBottom();
        self.showTypingFor(showTypingLength)
        .then(()=>{
            self
                .state
                .messages
                .push({ type: 1, message: message });
            self.setState({});
            self.scrollToBottom();
        });
    }

    scrollToBottom(){
        // element.scrollTop = element.scrollHeight;
        setTimeout((()=>{
            const node = ReactDOM.findDOMNode(this.chatBottom);
            const node2 = ReactDOM.findDOMNode(this.chatContainer);
            node2.scrollTop = node2.scrollHeight;
            node.scrollIntoView({ behavior: "smooth" });
        }).bind(this), 100);
        
    }

    handleKeyPress(event) {
        var self = this;
        switch (event.key) {
            case 'Enter':
                self.sendMessage();
                break;
            default:
                if (event.target.value !== self.state.currentComposedMessage) {
                    self.setState({currentComposedMessage: event.target.value});
                }
                break;
        }
    }

    handleInputChanged(event) {
        var self = this;
        self.setState({currentComposedMessage: event.target.value});
    }

    render() {
        let self = this;
        return (
            <div style={{position:"absolute"}}
            ref={(ele) => {
                    this.chatContainer = ele;
                }}>
                <div style={{height:'84vh', overflow:'scroll'}}>
                <ChatFeed
                    messages={self.state.messages}
                    isTyping={true}
                    hasInputField={false}
                    bubblesCentered={false}
                    bubbleStyles={self.state.bubbleStyles}/>
                <div ref={(ele) => {
                    this.chatBottom = ele;
                }}
                style={{height:"5px"}} />
                </div>
                <input
                    ref={(input) => {
                    this.textInput = input;
                }}
                    className="chatInput"
                    placeholder={self.state.textBoxPlaceholder}
                    type="text"
                    style={self.state.textBoxStyle}
                    onKeyDown={self
                    .handleKeyPress
                    .bind(self)}
                    onChange={self
                    .handleInputChanged
                    .bind(self)}/>
                {
                    (()=>{
                        if (self.state.isTyping){
                            return <Loading/>
                        }
                    })()
                }
                
            </div>
        );
    }
}

ReactDOM.render(
    <WitAIChatFeed apiKey="CKNRVMTUDFMPFLIYGUY2NS5B6CA3MSYH"/>, document.getElementById('mebot-root'));