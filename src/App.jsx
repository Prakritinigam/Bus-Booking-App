import { useState } from "react";
import { HashRouter as Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./Components/HomePage";
import { BookingProvider } from "./BusContext/BookingContext";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import BusListing from "./Components/BusListing";
import SelectBus from "./Components/SelectBus";
import "react-toastify/dist/ReactToastify.css"; // Import the toast CSS

function App() {
  return (
    <>
      <BookingProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buses" element={<BusListing />} />
          <Route path="/selectbus" element={<SelectBus />} />
        </Routes>
      </BookingProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
