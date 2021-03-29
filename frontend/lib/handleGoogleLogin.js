export default function handleGoogleLogin() {
  window.location.assign(`${process.env.BACKEND_HOST}/redirect/google`);
}
