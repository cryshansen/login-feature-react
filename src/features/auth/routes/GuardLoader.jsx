// features/auth/routes/GuardLoader.tsx

import AppLoader from "../../../ui/loaders/AppLoader";

export default function GuardLoader() {
  return (
    <AppLoader
      title="Checking access"
      message="Please wait…"
    />
  );
}
