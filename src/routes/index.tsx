import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, LoadingPage, Projetos } from "../pages";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projetos" element={<Projetos />} />
      </Routes>
    </BrowserRouter>
  );
}
