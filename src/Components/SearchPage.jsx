import React, { useState, useRef } from "react";
import "../css/SearchPage.css";
import { useBooking } from "../BusContext/BookingContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SearchPage = () => {
  const navigate = useNavigate();
  const { searchParams, setSearchParams, setBuses, setLoading } = useBooking();

  const [localSearchinput, setLocalSearch] = useState(searchParams);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const debounceRef = useRef(null);

  const API_KEY = "79936fab24da46218e7460e6fad3cdda"; // Geoapify API key

  const fetchSuggestions = async (input, setter) => {
    if (!input) {
      setter([]);
      return;
    }
    try {
      const res = await axios.get(
        "https://api.geoapify.com/v1/geocode/autocomplete",
        {
          params: {
            text: input,
            type: "city",
            filter: "countrycode:in",
            format: "json",
            apiKey: API_KEY,
          },
        }
      );
      const cities = res.data.results.map((item) => item.city).filter(Boolean);
      setter([...new Set(cities)]);
    } catch (err) {
      console.error("Geoapify error:", err);
      setter([]);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLocalSearch({ ...localSearchinput, [name]: value });

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (name === "from") fetchSuggestions(value, setFromSuggestions);
      if (name === "to") fetchSuggestions(value, setToSuggestions);
    }, 300);
  };

  const selectSuggestion = (field, value) => {
    setLocalSearch((prev) => ({ ...prev, [field]: value }));
    if (field === "from") setFromSuggestions([]);
    if (field === "to") setToSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !localSearchinput.from ||
      !localSearchinput.to ||
      !localSearchinput.date
    ) {
      toast.warning("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      setSearchParams(localSearchinput);
      const response = await axios.post(
        "https://uat.travl.tech/api/bus/search",
        {
          source: localSearchinput.from,
          destination: localSearchinput.to,
          doj: localSearchinput.date,
        }
      );
      const data = response.data;
      if (data && data.data && data.data.tripDetails.length > 0) {
        setBuses(data.data.tripDetails);
        toast.success("Bus found");
        navigate("/buses");
      } else {
        toast.warning("No buses found");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-container">
        <h2>Book your Bus Ticket</h2>
        <div className="search-container">
          <form className="form-fields" onSubmit={handleSubmit}>
            <div className="input-icon">
              <i className="fas fa-map-marker-alt"></i>
              <input
                type="text"
                placeholder="From"
                name="from"
                value={localSearchinput.from}
                onChange={handleInput}
                autoComplete="off"
              />
              {fromSuggestions.length > 0 && (
                <ul className="suggestions-list">
                  {fromSuggestions.map((city, index) => (
                    <li
                      key={index}
                      onClick={() => selectSuggestion("from", city)}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="input-icon">
              <i className="fas fa-map-marker-alt"></i>
              <input
                type="text"
                placeholder="To"
                name="to"
                value={localSearchinput.to}
                onChange={handleInput}
                autoComplete="off"
              />
              {toSuggestions.length > 0 && (
                <ul className="suggestions-list">
                  {toSuggestions.map((city, index) => (
                    <li
                      key={index}
                      onClick={() => selectSuggestion("to", city)}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="input-icon">
              <i className="fas fa-calendar-alt"></i>
              <input
                type="date"
                name="date"
                value={localSearchinput.date}
                onChange={handleInput}
              />
            </div>

            <button type="submit" className="btn btn-success search-button">
              Search
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SearchPage;
