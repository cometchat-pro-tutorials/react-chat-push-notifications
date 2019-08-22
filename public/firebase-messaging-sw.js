importScripts('https://www.gstatic.com/firebasejs/6.4.0/firebase.js');

var config = {
  apiKey: "AIzaSyBhkVOSvn4M6kkNPlMI7U3g9pXPqMeCNmc",
  authDomain: "push-notifications-testi-217e6.firebaseapp.com",
  databaseURL: "https://push-notifications-testi-217e6.firebaseio.com",
  projectId: "push-notifications-testi-217e6",
  storageBucket: "",
  messagingSenderId: "375949858529",
  appId: "1:375949858529:web:2ecd8afc2259b04a"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

//background
messaging.setBackgroundMessageHandler(function(payload) {
  console.log(' Received background message ', payload);

  // Customize notification here
  var notificationTitle = 'New CometChat message';
  var notificationOptions = {
    body: payload.data.alert,
    icon: payload.data.entities.sender.entity.avatar,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

// [END background_handler]
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  //handle click event onClick on Web Push Notification
});
