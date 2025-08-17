import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

// Placeholder components for missing pages
const Mother = () => <div>Mother Monitor Page</div>;
const Child = () => <div>Child Monitor Page</div>;
const Plan = () => <div>Plan Page</div>;
const History = () => <div>History Page</div>;

export const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/monitor/mother" element={<Mother />} />
      <Route path="/monitor/child" element={<Child />} />
      <Route path="/plan" element={<Plan />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}
