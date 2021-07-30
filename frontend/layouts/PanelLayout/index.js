import React from "react";
import PanelAuth from "./PanelAuth";

export default function PanelLayout({ children }) {
  return <PanelAuth>{children}</PanelAuth>;
}
