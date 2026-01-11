export function RoleRoute({ allowedRoles }) {
  const { authuser, authReady } = useAuth();

  if (!authReady) return null;

  if (!allowedRoles.includes(authuser?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
