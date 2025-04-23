import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
  });

  const [buses, setBuses] = useState(() => {
    const saved = localStorage.getItem("busdata");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("busdata", JSON.stringify(buses));
  }, [buses]);

  const [isLoading, setLoading] = useState(false);
  const [selectedBus, setSelectedBus] = useState(() => {
    const saved = localStorage.getItem("selectedbusdata");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("selectedbusdata", JSON.stringify(selectedBus));
  }, [selectedBus]);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const [seatMap, setSeatMap] = useState([]);
  // const [passengerInfo, setPassengerInfo] = useState([]);

  // const [bookingConfirmation, setBookingConfirmation] = useState(null);

  // const [timer, setTimer] = useState(null);

  return (
    <BookingContext.Provider
      value={{
        searchParams,
        setSearchParams,

        buses,
        setBuses,

        theme,
        toggleTheme,

        selectedBus,
        setSelectedBus,

        seatMap,
        setSeatMap,

        selectedSeats,
        setSelectedSeats,

        // passengerInfo,
        // setPassengerInfo,

        // bookingConfirmation,
        // setBookingConfirmation,

        // timer,
        // setTimer,

        isLoading,
        setLoading,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
