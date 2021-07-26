import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../../lib/store/actions/auth";

export default function token() {
  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    let urlParams = window.location.search;
    urlParams = urlParams.substring(1);
    router.push("/user/dashboard");
    const data = { login: { access_token: urlParams } };
    dispatch(loginAction(data));
    localStorage.setItem("user", JSON.stringify(data));
  }, []);

  return null;
}
