import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom"; // No need for Router here
import Navbar from "./Components/Navbar";
import HomePage from "./Components/HomePage";
import { BookingProvider } from "./BusContext/BookingContext";
import { ToastContainer } from "react-toastify";
import BusListing from "./Components/BusListing";
import SelectBus from "./Components/SelectBus";

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
