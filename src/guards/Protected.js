import { LOGIN_ERROR } from "context/authContext";
import { LOGIN_SUCCESS } from "context/authContext";
import { LOGOUT } from "context/authContext";
import { useAuthController } from "context/authContext";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import authApi from "services/api/authAPI";
import { getMyAccount } from "services/api/authAPI";

// eslint-disable-next-line react/prop-types
function Protected({ roles = ["admin"], redirectPath = "/authentication/sign-in", children }) {
  const [controller, dispatch] = useAuthController();
  const { accessToken, user } = controller;

  const navigate = useNavigate();
  useEffect(() => {
    if (!user && accessToken) {
      getMyAccount()
        .then(({ user }) => dispatch({ type: LOGIN_SUCCESS, payload: { user } }))
        .catch((error) => {
          dispatch({ type: LOGIN_ERROR, payload: error.message || error });
          dispatch({ type: LOGOUT });
        });
    }
    if (user?.type?.name && !roles.includes(user.type.name)) {
      dispatch({ type: LOGIN_ERROR, payload: "Bạn không phải là admin" });
      dispatch({ type: LOGOUT });
      navigate(redirectPath);
    }
  }, [user, accessToken, roles, navigate]);

  return accessToken ? children : <Navigate to={redirectPath} />;
}
export default Protected;
