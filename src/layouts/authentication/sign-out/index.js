import { LOGOUT } from "context/authContext";
import { useAuthController } from "context/authContext";
import React, { useEffect } from "react";

const SignOut = () => {
  const [controller, dispatch] = useAuthController();
  const { accessToken } = controller;
  useEffect(() => {
    if (accessToken) {
      dispatch({ type: LOGOUT });
    }
  }, [accessToken]);
  return <div>Logout</div>;
};

export default SignOut;
