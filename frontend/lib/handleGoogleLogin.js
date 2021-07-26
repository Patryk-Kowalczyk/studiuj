export default function handleGoogleLogin() {
  window.location.assign(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/redirect/google`);
}
