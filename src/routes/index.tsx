import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, LoadingPage } from "../pages";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
