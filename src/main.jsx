import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom"; // Only import BrowserRouter here

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/Bus-Booking-App">
      {" "}
      {/* Only wrap App with BrowserRouter here */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
