import React from "react";
import "../components/dashboard/DashboardAuth";

export default function DashboardLayout({ children }) {
  return <DashboardAuth>{children}</DashboardAuth>;
}
