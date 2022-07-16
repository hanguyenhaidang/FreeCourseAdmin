import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function MatchRoles({
  roles = ["student", "admin", "teacher"],
  redirectPath = "/",
  children,
}) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.type?.name && !roles.includes(user.type.name)) {
      navigate(redirectPath);
    }
  }, [user, dispatch, roles, navigate, redirectPath]);

  return children;
}
export default MatchRoles;
