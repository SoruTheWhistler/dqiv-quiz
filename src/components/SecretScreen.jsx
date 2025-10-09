import React from "react";
import "./SecretScreen.css";

export default function SecretScreen({msg}) {
  setTimeout(() => window.location.reload(), 5000);
  return <main id="secret-screen">{msg || "C'est pas bien de tricher."}</main>;
}
