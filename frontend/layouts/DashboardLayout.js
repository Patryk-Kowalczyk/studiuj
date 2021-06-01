import React from "react";
import DashboardAuth from "../components/dashboard/DashboardAuth";

export default function DashboardLayout({ children }) {
  return <DashboardAuth>{children}</DashboardAuth>;
}
