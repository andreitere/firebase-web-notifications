import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseConfig from "./firebase.config";
class NotificationsService {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.messaging = getMessaging(this.app);
  }
  async registerWorker() {
    const registration = await navigator.serviceWorker.register(
      "./firebase-messaging-sw.js",
      {
        type: "module",
      }
    );
    console.log({ registration });
    this.workerRegistration = registration;
  }
  async updateWorker() {
    this.workerRegistration?.update();
  }
  async getWebToken() {
    return await getToken(this.messaging, {
      vapidKey: import.meta.env.VITE_APP_FIREBASE_VAPKEY,
      serviceWorkerRegistration: this.workerRegistration,
    });
  }
  onNotifications(cb) {
    onMessage(this.messaging, (payload) => {
      console.info(`got notification`, payload);
      cb(payload);
    });
  }
}

export default new NotificationsService();
