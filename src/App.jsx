import "./App.css";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "./shared/LoadingSpinner";
const AppRoute = lazy(() => import("./routes/AppRoute"));
// import AppRoute from "./routes/AppRoute";
function App() {
  if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("Service Worker Registered"));
  });
}

  return (
    <Suspense fallback={<LoadingSpinner message="Loading..." />}>
      <AppRoute />
    </Suspense>
  );
}

export default App;
