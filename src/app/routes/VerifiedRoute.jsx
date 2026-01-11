export function VerifiedRoute() {
  const { authuser, authReady } = useAuth();

  if (!authReady) return null;

  if (!authuser?.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return <Outlet />;
}
