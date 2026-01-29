// src/ui/loaders/AppLoader.tsx
type AppLoaderProps = {
  title?: string;
  message?: string;
};

export default function AppLoader({
  title = "Loading",
  message = "Please wait…",
}: AppLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-6">
      <h1 className="text-lg font-semibold">{title}</h1>
      <p className="text-sm opacity-70">{message}</p>
    </div>
  );
}
