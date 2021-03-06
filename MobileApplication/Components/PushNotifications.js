import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS } from 'react-native';
this.lastId = 0;
const configure = () => {
 PushNotification.configure({

   onRegister: function(token) {
     //process token
   },

   onNotification: function(notification) {
     // process the notification
     // required on iOS only
     notification.finish(PushNotificationIOS.FetchResult.NoData);
   },

   permissions: {
     alert: true,
     badge: true,
     sound: true
   },

   popInitialNotification: true,
   requestPermissions: true,

 });
};
const localNotification = () => {
    this.lastId++;

    PushNotification.localNotification({
    /* Android Only Properties */
    id: ''+this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    autoCancel: true, // (optional) default: true
    largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
    smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
    bigText: "", // (optional) default: "message" prop
    subText: "Dont forget to upload a picture or explore the app!", // (optional) default: none
    color: "red", // (optional) default: system default
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: 'some_tag', // (optional) add tag to message
    group: "group", // (optional) add group to message
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    priority: "high", // (optional) set notification priority, default: high
    visibility: "private", // (optional) set notification visibility, default: private
    importance: "high", // (optional) set notification importance, default: high

    /* iOS only properties */
   

    /* iOS and Android properties */
    title: "Daily Reminder", // (optional)
    message: "Dont forget to upload a picture or explore the app!", // (required)
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    repeatType: 'time', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    repeatTime: 10000,
    });
   };
   const localNotificationSec = () => {
    PushNotification.cancelAllLocalNotifications();
    this.lastId++;

    PushNotification.localNotificationSchedule({
    /* Android Only Properties */
    id: ''+this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    autoCancel: true, // (optional) default: true
    largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
    smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
    bigText: "", // (optional) default: "message" prop
    subText: "Dont forget to upload a picture or explore the app!", // (optional) default: none
    color: "red", // (optional) default: system default
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: 'some_tag', // (optional) add tag to message
    group: "group", // (optional) add group to message
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    priority: "high", // (optional) set notification priority, default: high
    visibility: "private", // (optional) set notification visibility, default: private
    importance: "high", // (optional) set notification importance, default: high,
    date:new Date(Date.now() + (60 * 60 * 1000)),
    
    /* iOS only properties */
   

    /* iOS and Android properties */
    title: "Daily Reminder", // (optional)
    message: "Dont forget to upload a picture or explore the app!", // (required)
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    });
   };
   const Cancel = () => {
    PushNotification.cancelAllLocalNotifications();
   };




export {
 configure,
 localNotification,
 localNotificationSec,
 Cancel
};
