import React, { useState, useEffect } from "react";
import "../css/selectedBus.css";
import { useBooking } from "../BusContext/BookingContext";
import { toast } from "react-toastify";

const Layout = [
  [
    { id: "1A", status: "available" },
    { id: "1B", status: "booked" },
    null,
    { id: "1C", status: "available" },
    { id: "1D", status: "available" },
  ],
  [
    { id: "2A", status: "available" },
    { id: "2B", status: "available" },
    null,
    { id: "2C", status: "booked" },
    { id: "2D", status: "available" },
  ],
  [
    { id: "5A", status: "available" },
    { id: "5B", status: "booked" },
    null,
    { id: "5C", status: "available" },
    { id: "5D", status: "available" },
  ],
  [
    { id: "6A", status: "available" },
    { id: "6B", status: "booked" },
    null,
    { id: "6C", status: "available" },
    { id: "6D", status: "booked" },
  ],
  [
    { id: "7A", status: "booked" },
    { id: "7B", status: "booked" },
    null,
    { id: "7C", status: "available" },
    { id: "7D", status: "booked" },
  ],
  [
    { id: "8A", status: "available" },
    { id: "8B", status: "available" },
    null,
    { id: "9C", status: "available" },
    { id: "9D", status: "available" },
  ],
  [
    { id: "10A", status: "available" },
    { id: "10B", status: "booked" },
    null,
    { id: "10C", status: "available" },
    { id: "10D", status: "available" },
  ],
];

const SelectBus = () => {
  const { seatMap, setSeatMap, selectedBus } = useBooking();
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const bookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];

    const updatedLayout = Layout.map((row) =>
      row.map((seat) => {
        if (seat && bookedSeats.includes(seat.id)) {
          return { ...seat, status: "booked" };
        }
        return seat;
      })
    );

    setSeatMap(updatedLayout);
    localStorage.removeItem("bookedSeats");
  }, []);

  const seatPrice = selectedBus?.fareMasters?.[0].totalAmount || 0;
  const totalPrice = selectedSeats.length * seatPrice;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]{3,}$/.test(name.trim())) {
      newErrors.name = "Name must be at least 3 letters and only alphabets";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!age.trim()) {
      newErrors.age = "Age is required";
    } else if (+age < 5 || +age > 100) {
      newErrors.age = "Age must be between 5 and 100";
    }

    if (!agreed) {
      newErrors.agreed = "You must agree to continue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelect = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const handleBooking = () => {
    if (!validateForm()) return;

    const updatedLayout = seatMap.map((row) =>
      row.map((seat) => {
        if (seat && selectedSeats.includes(seat.id)) {
          return { ...seat, status: "booked" };
        }
        return seat;
      })
    );

    setSeatMap(updatedLayout);
    setSelectedSeats([]);
    toast.success(
      `Booking Confirmed: ${selectedSeats.join(
        ", "
      )} \n Passenger details: ${name} | ${email} | ${phone} `
    );

    const allBooked = updatedLayout
      .flat()
      .filter((seat) => seat && seat.status === "booked")
      .map((seat) => seat.id);

    localStorage.setItem("bookedSeats", JSON.stringify(allBooked));

    setAge("");
    setEmail("");
    setPhone("");
    setName("");
  };

  return (
    <div className="row">
      <div className="layout-container col-sm-6">
        <p>{selectedBus.busType}</p>
        <p>
          {selectedBus.departureTime} &nbsp;🟢 -------- {selectedBus.duration}{" "}
          -------- 🔵 &nbsp;
          {selectedBus.arrivalTime}
        </p>
        <p>
          {selectedBus.boardingDetails?.map((board, index) => (
            <span key={index}>{board.boardingAddress} </span>
          ))}{" "}
          &nbsp;➡&nbsp;
          {selectedBus.droppingDetails?.map((drop, index) => (
            <span key={index}>{drop.droppingAddress}</span>
          ))}
        </p>
        <h2>Select Seats</h2>
        <div className="layout">
          {seatMap.map((row, i) => (
            <div className="seat-row " key={i}>
              {row.map((seat, j) =>
                seat ? (
                  <div
                    key={j}
                    className={`seat ${seat.status} ${
                      selectedSeats.includes(seat.id) ? "selected" : ""
                    }`}
                    title={`Seat: ${seat.id} | Status: ${seat.status} | price ${selectedBus.fareMasters?.[0]?.totalAmount}`}
                    onClick={() =>
                      seat.status === "available" && handleSelect(seat.id)
                    }
                  >
                    {seat.id}
                  </div>
                ) : (
                  <div key={j} className="seat empty"></div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="col-sm-6">
        <div className="selected-info ">
          <h4>Selected Seats:</h4>
          <p>{selectedSeats.join(", ") || "None"}</p>
          <span>
            <h4>Total Price:</h4> <p>₹ {totalPrice}</p>
          </span>

          <div className="mb-3 finalform">
            <label htmlFor="exampleInputName" className="form-label">
              Passenger Full Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
          {errors.name && <p className="text-danger">{errors.name}</p>}

          <div className="mb-3 finalform">
            <label htmlFor="exampleInputEmail" className="form-label">
              Email address <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          {errors.email && <p className="text-danger">{errors.email}</p>}

          <div className="mb-3 finalform">
            <label htmlFor="exampleInputPhone" className="form-label">
              Phone Number <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPhone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              required
            />
          </div>
          {errors.phone && <p className="text-danger">{errors.phone}</p>}

          <div className="mb-3 finalform">
            <label htmlFor="exampleInputAge" className="form-label">
              Age <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputAge"
              onChange={(e) => setAge(e.target.value)}
              value={age}
              required
            />
          </div>
          {errors.age && <p className="text-danger">{errors.age}</p>}

          <div className="mb-3">
            <label htmlFor="agree" className="form-label">
              <input
                type="checkbox"
                onChange={() => setAgreed(!agreed)}
                checked={agreed}
              />
              I agree to the terms and conditions
            </label>
          </div>
          {errors.agreed && <p className="text-danger">{errors.agreed}</p>}

          <button className="btn btn-primary" onClick={handleBooking}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectBus;
