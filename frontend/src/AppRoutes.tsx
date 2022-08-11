import { Routes, Route, useLocation } from "react-router-dom";

// Pages
import AppMain from "./pages/AppMain";

function AppRoutes() {
  return (
    <Routes>
      <Route path={`/*`} element={<AppMain />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  const location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default AppRoutes;
