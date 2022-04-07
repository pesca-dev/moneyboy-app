// /* eslint-disable no-console */
// import { NotificationService } from '@moneyboy/api/NotificationService';
// import { NotificationToken } from '@moneyboy/api/NotificationToken';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotification from 'react-native-push-notification';

// export class IosNotificationService implements NotificationService {
//   public token: NotificationToken = { os: '', token: '' };

//   public async configure(): Promise<void> {
//     return new Promise((res, rej) => {
//       PushNotification.configure({
//         // (optional) Called when Token is generated (iOS and Android)
//         onRegister: token => {
//           this.token = token;
//           res();
//         },

//         // (required) Called when a remote is received or opened, or local notification is opened
//         onNotification: notification => {
//           console.log('NOTIFICATION:', notification);

//           // process the notification

//           // (required) Called when a remote is received or opened, or local notification is opened
//           notification.finish(PushNotificationIOS.FetchResult.NoData);
//         },

//         // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
//         onAction: notification => {
//           console.log('ACTION:', notification.action);
//           console.log('NOTIFICATION:', notification);

//           // process the action
//         },

//         // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
//         onRegistrationError: err => {
//           console.error(err.message, err);
//           rej();
//         },

//         // IOS ONLY (optional): default: all - Permissions to register.
//         permissions: {
//           alert: true,
//           badge: true,
//           sound: true,
//         },

//         // Should the initial notification be popped automatically
//         // default: true
//         popInitialNotification: true,

//         /**
//          * (optional) default: true
//          * - Specified if permissions (ios) and token (android and ios) will requested or not,
//          * - if not, you must call PushNotificationsHandler.requestPermissions() later
//          * - if you are not using remote notification or do not have Firebase installed, use this:
//          *     requestPermissions: Platform.OS === 'ios'
//          */
//         requestPermissions: true,
//       });
//     });
//   }

//   private onRegister(token: NotificationToken): void {
//     this.token = token;
//   }
// }
