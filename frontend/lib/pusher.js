import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useEffect } from "react";

const ISSERVER = typeof window === "undefined";

let token = "";

if (!ISSERVER) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    token = user.login.access_token;
  }
}

const options = {
  broadcaster: "pusher",
  key: process.env.PUSHER_KEY,
  cluster: process.env.CLUSTER,
  forceTLS: true,
  //authEndpoint is your apiUrl + /broadcasting/auth
  authEndpoint: process.env.BACKEND_HOST + "/broadcasting/auth",
  // As I'm using JWT tokens, I need to manually set up the headers.
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  },
};

export function createSocketConnection() {
  if (!ISSERVER && !window.Echo) {
    window.Echo = new Echo(options);
  }
}

export function useEcho() {
  return window.Echo;
}
