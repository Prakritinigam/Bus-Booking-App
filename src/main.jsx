import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom"; // Keep BrowserRouter import

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/Bus-Booking-App">
      {" "}
      {/* Added basename */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
