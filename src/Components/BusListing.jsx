import React, { useEffect } from "react";
import { useBooking } from "../BusContext/BookingContext";
import SearchPage from "./SearchPage";
import logo from "../assets/logo.png";
import "../css/BusListing.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BusListing = () => {
  const { buses, isLoading, setSelectedBus } = useBooking();

  const navigate = useNavigate();
  const handleSelectedBus = (bus) => {
    setSelectedBus(bus);
    localStorage.setItem("busitem", JSON.stringify(bus));
    toast.success("Book Seats now !!");
    navigate("/selectbus");
  };

  useEffect(() => {});

  return (
    <div>
      <SearchPage />
      <div className="bus-container">
        {isLoading ? (
          <div className="row">
            {[...Array(3)].map((_, index) => (
              <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
                <div className="card listcard skeleton-card">
                  <div className="card-header">
                    <div className="skeleton-img"></div>
                  </div>
                  <div className="card-body">
                    <div className="skeleton-text skeleton-title"></div>
                    <div className="skeleton-text skeleton-text-small"></div>
                    <div className="skeleton-text skeleton-text-small"></div>
                    <div className="skeleton-btn"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : buses.length > 0 ? (
          buses.map((bus) => (
            <div className="card listcard" key={bus.busKey}>
              <div className="card-header">
                <img src={logo} alt="bus" className="buslogo" />
              </div>
              <div className="row card-body">
                <div className="col-sm-8">
                  <h5 className="card-title">{bus.busType}</h5>
                  <p className="card-text">
                    {bus.departureTime} &nbsp;🟢 -------- {bus.duration}{" "}
                    -------- 🔵 &nbsp;
                    {bus.arrivalTime}
                  </p>
                  <p className="address">
                    {bus.boardingDetails?.map((board, index) => (
                      <span key={index}>{board.boardingAddress} </span>
                    ))}
                    &nbsp;➡&nbsp;
                    {bus.droppingDetails?.map((drop, index) => (
                      <span key={index}>{drop.droppingAddress}</span>
                    ))}
                  </p>
                </div>

                <div className="col-sm-4 text-end">
                  <p className="mb-1">
                    <strong>Available Seats:</strong> {bus.availableSeats}
                  </p>
                  <p className="mb-2">
                    <strong>Total Fare:</strong> ₹
                    {bus.fareMasters?.[0]?.totalAmount}
                  </p>
                  <button
                    className="btn btn-success"
                    onClick={() => handleSelectedBus(bus)}
                  >
                    Select Seats
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Bus not found</p>
        )}
      </div>
    </div>
  );
};

export default BusListing;
