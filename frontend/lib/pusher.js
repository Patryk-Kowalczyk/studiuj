import Echo from "laravel-echo";

const user = JSON.parse(localStorage.getItem("user"));
let token = "";
if (user) {
  token = user.login.access_token;
}
const options = {
  broadcaster: "pusher",
  key: config.pusher.key,
  cluster: config.pusher.cluster,
  forceTLS: config.pusher.tls,
  //authEndpoint is your apiUrl + /broadcasting/auth
  authEndpoint: config.pusher.authEndpoint,
  // As I'm using JWT tokens, I need to manually set up the headers.
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  },
};

export default new Echo(options);
