import "./style.css";
import NotifService from "./notifications";

const $subscribe = document.querySelector("#subscribe");
const $token = document.querySelector("#token");
const $clear = document.querySelector("#clear");
const $notifications = document.querySelector("#notifications");
let notifications = [];

const renderNotifications = (_) => {
  $notifications.innerHTML = "";
  notifications.forEach(({ title, body }) => {
    let notif = document.createElement("div");
    notif.classList.add("notif");
    notif.innerHTML = `🔔[${title}]: ${body}`;
    $notifications.appendChild(notif);
  });
};
window.addEventListener("load", async (_) => {
  await NotifService.registerWorker();
  onSubscribe();
  NotifService.onNotifications((notification) => {
    notifications.push(notification.notification);
    renderNotifications();
  });
});

const onSubscribe = async (_) => {
  let permission = await Notification.requestPermission();
  console.log(`[onSubscribe] `, { permission });
  if (permission == "denied") {
    return console.error(`[onSubscribe] `, { permission });
  }
  let token = await NotifService.getWebToken();
  $token.innerHTML = token;
  console.group(`[onSubscribe]  token`);
  console.log(token);
  console.groupEnd(`[onSubscribe]  token`);
};

$subscribe.addEventListener("click", onSubscribe);
$updateWorker.addEventListener("click", (_) => NotifService.updateWorker());
$clear.addEventListener("click", (_) => {
  notifications = [];
  renderNotifications();
});
