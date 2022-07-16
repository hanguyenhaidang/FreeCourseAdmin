import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AUTHENTICATION_REQUEST } from "store/types/data-types/auth-types";

function Protected({
  roles = ["student", "admin", "teacher"],
  redirectPath = "/login",
  children,
}) {
  const { user, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && accessToken) {
      dispatch({ type: AUTHENTICATION_REQUEST });
    }
    if (user?.type?.name && !roles.includes(user.type.name)) {
      navigate("/");
    }
  }, [user, accessToken, dispatch, roles, navigate]);

  return accessToken ? children : <Navigate to={redirectPath} />;
}
export default Protected;
