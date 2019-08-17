import React from 'react';
import {CometChat} from '@cometchat-pro/chat';
import MDSpinner from 'react-md-spinner';

import emptyChatImage from '../assets/empty-state.svg';
import logoImage from '../assets/logo.svg';

const {REACT_APP_COMETCHAT_GUID} = process.env;

class Chat extends React.Component {
  constructor(props) {
    super();
    this.state = {
      message: '',
      chat: [],
      isLoading: true,
      user: props.location.state? props.location.state.user : '',
      isSending: false,
    };
  }

  componentWillMount(){
    if(!this.props.location.state){
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    let messagesRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(REACT_APP_COMETCHAT_GUID)
      .setLimit(100)
      .build();

    messagesRequest.fetchPrevious().then(
      messages => {
        this.setState({
          chat: messages,
          isLoading: false,
        });
      },
      error => {
        console.log('Message fetching failed with error:', error);
      }
    );

    CometChat.addMessageListener(
      'MESSAGE_LISTENER_KEY',
      new CometChat.MessageListener({
        onTextMessageReceived: message => {
          let {chat} = this.state;
          console.log('Incoming Message Log', {message});
          chat.push(message);
          this.setState({
            chat
          });
        },
      })
    );
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    console.log('removing listener')
    CometChat.removeMessageListener('MESSAGE_LISTENER_KEY');
  }

  handleSendMessage = event => {
    event.preventDefault();
    this.setState({
      isSending: true
    });
    const {message} = this.state;

    let textMessage = new CometChat.TextMessage(
      REACT_APP_COMETCHAT_GUID,
      message,
      CometChat.MESSAGE_TYPE.TEXT,
      CometChat.RECEIVER_TYPE.GROUP
    );

    CometChat.sendMessage(textMessage).then(
      message => {
        const { chat } = this.state;
        chat.push(message);
        this.setState({
          chat
        })
        console.log('Message sent successfully:', message);
      },
      error => {
        console.log('Message sending failed with error:', error);
      }
    );
    this.setState({
      message: '',
      isSending: false,
    });
  };

  scrollToBottom = () => {
    const chat = document.getElementById("endofchat");
    chat.scrollIntoView();
  }

  render() {
    let {chat, message, isLoading, isSending, user} = this.state;
    let chatContent = (
      <div className='loading-messages-container'>
        <MDSpinner size='100' />
        <span className='loading-text'>Loading Messages</span>
      </div>
    );
    let sendButton = isSending? <div className="message-send-spinner"><MDSpinner size='30'/></div>: <div className="message-send-icon" onClick={this.handleSendMessage}><i className="fa fa-paper-plane fa-2x"></i></div>;

    if (!isLoading && !chat.length) {
      chatContent = (
        <div className='text-center img-fluid empty-chat'>
          <div className='empty-chat-holder'>
            <img src={emptyChatImage} className='img-res' alt='empty chat' />
          </div>

          <div>
            <h2> No new message? </h2>
            <h6 className='empty-chat-sub-title'>
              Send your first message below.
            </h6>
          </div>
        </div>
      );
    } 
    else if (!isLoading && chat.length) {
      chatContent = chat.map(chat => {
        let isUser = user.uid === chat.sender.uid;
        let renderName;
        if (isUser) {
          renderName = null;
        } else {
          renderName = (
            <div className='sender-name'>{chat.sender.name}</div>
          );
        }
        return (
          <div key={chat.id} className='chat-bubble-row' style={{flexDirection: isUser ? 'row-reverse' : 'row'}}>
              <img src={chat.sender.avatar} alt='sender avatar' className='avatar' style={isUser ? {marginLeft: '30px'} : {marginRight: '30px'}} />
              <div className={`chat-bubble ${isUser? 'is-user':'is-other'}`}>
                {renderName}
                <div className='message' style={{color: isUser ? '#FFF' : '#2D313F'}}>
                  {chat.text}
                </div>
              </div>
          </div>
        )
      });
    }

    return (
      <div className='chat-container'>
        <nav>
            <div className="nav-left-section">
                <img className="logo" src={logoImage} alt="logo" />
                <span className="title">Chat</span>
            </div>
            <div className="nav-right-section">
                <span className="welcome-message">Welcome <b>{ user.name }</b> </span> <img src={user.avatar} className="avatar" alt="user avatar" />
            </div>
        </nav>
        <div className='chat'>
          <div className='container'>
            <div className='chat-header'>
              <div className='active'>
                <h5>#General</h5>
              </div>
            </div>

            <div className='chat-page'>
                  <div className='msg-page'>
                    {chatContent}
                    <div id='endofchat'></div>
                  </div>
                  <div className='msg-footer'>
                    <form
                      className='message-form'
                      onSubmit={this.handleSendMessage}>
                      <div className='input-group'>
                        <input
                          type='text'
                          className='form-control message-input'
                          placeholder='Type something'
                          value={message}
                          onChange={ event => this.setState({ message: event.target.value }) }
                          required
                        />
                        {sendButton}
                      </div>
                    </form>
                  </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
