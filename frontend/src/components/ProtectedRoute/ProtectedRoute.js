import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  element: Component,
  isLoggedIn,
  userEmail,
  ...props
}) => {
  return isLoggedIn ? (
    <Component userEmail={userEmail} {...props} />
  ) : (
    <Navigate to={"/sign-in"} replace />
  );
};

export default ProtectedRoute;
