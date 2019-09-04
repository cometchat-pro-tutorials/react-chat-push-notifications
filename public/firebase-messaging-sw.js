importScripts("https://www.gstatic.com/firebasejs/6.4.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.4.0/firebase-messaging.js");

if (firebase.messaging.isSupported()) {

  const config = {
    // your firebase messagingSenderId here
  };

  firebase.initializeApp(config);

  const messaging = firebase.messaging();

  messaging.setBackgroundMessageHandler(function(payload) {
    console.log(' Received background message ', payload);

    const sender = JSON.parse(payload.data.message);
    const notificationTitle = 'New CometChat message';
    const notificationOptions = {
      body: payload.data.alert,
      icon: sender.data.entities.sender.entity.avatar,
    };

    return self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );
  });

  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
  });
}
