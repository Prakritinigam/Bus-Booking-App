import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
