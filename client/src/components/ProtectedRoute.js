import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, openLogin, children }) => {
  if (!loggedIn) {
    openLogin();

    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
