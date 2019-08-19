# React Chat App With Push Notification Using CometChat PRO

This sample app shows how to build a React chat application using CometChat Pro SDK that will send Push Notification using Firebase Cloud Messaging. 

SCREENSHOTS

Jump straight into the code or read the accompanying step-by-step guide here on our blog.

## Technology

This demo uses:

* React
* CometChat Pro JavaScript SDK
* Firebase Cloud Messaging

## Running the demo locally

* Download the repository [here](https://github.com/cometchat-pro-tutorials/react-chat-push-notifications/archive/master.zip) or run `git clone https://github.com/cometchat-pro-tutorials/react-chat-push-notifications.git`
* In the `react-chat-push-notifications` directory, run `npm install`
* You need to sign up for CometChat PRO and create your application first
* Create an ApiKey. You can use auth-only permission for this application
* Create a Group from the dashboard
* Enable Push Notification extension from `Extensions` menu
* Create a `.env` file in the root folder of the project and paste the following content in it:

```
REACT_APP_COMETCHAT_API_KEY=YOUR_API_KEY
REACT_APP_COMETCHAT_APP_ID=YOUR_APP_ID
REACT_APP_COMETCHAT_GUID=YOUR_GROUP_GUID
```

Replace `YOUR_API_KEY`, `YOUR_APP_ID` and `YOUR_GROUP_GUID` with your API KEY, APP ID and GUID as obtained from your CometChat dashboard.

* Register a Firebase account at http://firebase.google.com/ and create a new Firebase project
* Add a new web application into your Firebase project
* Click on the settings menu, then go to the general tab
* Copy the Firebase config variable into `src/firebase.js` and `public/firebase-messaging-sw.js` (look at the comments there)
* Then in Firebase settings, go to the Cloud Messaging tab. Copy the server key here
* Go back into CometChat PRO dashboard, into Push Notification extension and click on `Actions -> Settings` Paste the FCM server key here
* run `npm start`

## Useful links

* [📚Tutorial](https://prodocs.cometchat.com/docs)

## Other examples

* [ReactJS Chat app](https://github.com/cometchat-pro/javascript-reactjs-chat-app)