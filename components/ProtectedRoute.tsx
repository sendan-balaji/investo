// components/ProtectedRoute.tsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// The props should be typed for clarity
interface ProtectedRouteProps {
  session: any; // You can use the Session type from @supabase/supabase-js
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ session, children }) => {
  // If there is no active session, redirect the user to the login page
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // If there is a session, render the child components.
  // `children` is used for single components, `Outlet` is used for nested routes.
  return children ? children : <Outlet />;
};

// --- THIS IS THE CRITICAL FIX ---
// We are exporting the component as the default export of this file.
export default ProtectedRoute;
