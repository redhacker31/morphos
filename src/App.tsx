import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import WorkspacePage from "./pages/WorkspacePage";
import DesignSystemPage from "./pages/DesignSystemPage";

const basePath = (import.meta.env.BASE_URL as string) || "/";

export default function App() {
  return (
    <BrowserRouter basename={basePath.replace(/\/$/, "") || "/"}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/workspace/:id" element={<WorkspacePage />} />
        <Route path="/design-system" element={<DesignSystemPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
