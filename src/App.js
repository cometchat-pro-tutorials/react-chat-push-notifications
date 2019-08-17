import React from 'react';
import {CometChat} from '@cometchat-pro/chat';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {NotificationContainer} from 'react-notifications';
import './firebase.js';

import './App.css';
import 'react-notifications/lib/notifications.css';
import Login from './components/Login';
import Chat from './components/Chat';

CometChat.init(process.env.REACT_APP_COMETCHAT_APP_ID);

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <NotificationContainer />
        <Route exact path='/' component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/chat' component={Chat} />
      </React.Fragment>
    </Router>
  );
};

export default App;
