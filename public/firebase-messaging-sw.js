importScripts("https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js");

// //Cấu hình Firebase messaging service worker Nhưng nếu dùng getToken rồi thì thôi vì getToken đã định nghĩa sẵn 1 Firebase messaging service worker

const firebaseConfig = {
    apiKey: "AIzaSyASW09O0FaTnRbjXjtPzvYaiXngZGJF8Js",
    authDomain: "themovie-af1e4.firebaseapp.com",
    databaseURL: "https://themovie-af1e4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "themovie-af1e4",
    storageBucket: "themovie-af1e4.appspot.com",
    messagingSenderId: "213895626531",
    appId: "1:213895626531:web:12ab9684155fb96111d696",
    measurementId: "G-J696PFDRG4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(async function (payload) {

    const notificationTitle = payload?.notification?.title;
    const notificationOptions = {
        body: payload?.notification?.body,
        icon: "https://firebasestorage.googleapis.com/v0/b/themovie-af1e4.appspot.com/o/Logo-light.png?alt=media&token=a18772c3-b1dc-422d-9dd8-92c8f0523889",
    };
    self?.registration?.showNotification(notificationTitle, notificationOptions);
    
 
    // const data = JSON.parse(payload?.data?.data ?? "");
    // const notificationTitle = "Background Message Title";
    // const notificationOptions = {
    //     body: "Background Message body.",
    //     icon: "https://hoibai.net/_next/image?url=%2Fassets%2Fimages%2Flogo%2Flogo_header.png&w=640&q=75"
    // };

    // self?.registration?.showNotification(notificationTitle,
    //     notificationOptions);

    // if (payload.data.isShowBackground.toString() == "true") {
    //     self?.registration?.showNotification(notificationTitle, notificationOptions);

    //     // self.onnotificationclick = (event) => {

    //     //     event.notification.close();

    //     //     event.waitUntil(
    //     //         clients
    //     //             .matchAll({
    //     //                 type: "window"
    //     //             })
    //     //             .then((clientList) => {
    //     //                 for (const client of clientList) {
    //     //                     if (client.url === "/" && "focus" in client) return client.focus();
    //     //                 }
    //     //                 if (clients.openWindow) return clients.openWindow(link);
    //     //             })
    //     //     );
    //     // };
    // }
});
