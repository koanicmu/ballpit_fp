import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import Intro from "./Intro";
import App from "./App";

function Overlay() {
  return (
    <>
      <Intro>
        <App />
      </Intro>
    </>
  );
}

createRoot(document.getElementById("root")).render(<Overlay />);
