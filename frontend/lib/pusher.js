import Echo from "laravel-echo";

const user = JSON.parse(localStorage.getItem("user"));
let token = "";
if (user) {
  token = user.login.access_token;
}

const ISSERVER = typeof window === "undefined";

const options = {
  broadcaster: "pusher",
  key: process.env.KEY,
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

export function createSocketConnection(token) {
  if (!ISSERVER && !window.Echo) {
    window.Echo = new Echo(options);
  }
}

function listen(callback, channel, event) {
  window.Echo.private(channel).listen(event, callback);

  return function cleanUp() {
    window.Echo.leaveChannel(`private-${channel}`);
  };
}

export function useEcho(callback, channel, event) {
  useEffect(() => {
    return listen(callback, channel, event);
  });
}
