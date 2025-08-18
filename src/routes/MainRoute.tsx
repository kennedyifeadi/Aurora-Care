import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { Mother } from "../pages/Mother";
import { Child } from "../pages/Child";
import { Plan } from "../pages/Plan";
import { History } from "../pages/History";

export const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/monitor" element={<Navigate to="/monitor/mother" replace />} />
      <Route path="/monitor/mother" element={<Mother />} />
      <Route path="/monitor/child" element={<Child />} />
      <Route path="/plan" element={<Plan />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}
