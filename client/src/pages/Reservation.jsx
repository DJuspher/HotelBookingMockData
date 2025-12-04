import React, { useState } from "react";
import axios from "axios";

const Reservation = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    reservationDate: "",
    reservationTime: "",
    pax: "",
    amount: "",
  });

  // Function to capitalize first letter of every word
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-capitalize Full Name
    if (name === "name") {
      const formatted = capitalizeWords(value);
      setForm({ ...form, name: formatted });
      return;
    }

    // Phone: allow only digits + 11 max
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 11) return;
    }

    // Amount: digits only
    if (name === "amount") {
      if (!/^\d*$/.test(value)) return;
    }

    // Pax: only pure numbers 1–10, no special chars
    if (name === "pax") {
      if (!/^\d*$/.test(value)) return;

      if (value === "") {
        setForm({ ...form, pax: "" });
        return;
      }

      const num = Number(value);
      if (num < 1 || num > 10) return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const reservationRes = await axios.post(
        "http://localhost:5000/api/reservation",
        form
      );

      console.log("Reservation saved:", reservationRes.data);

      const paymentRes = await axios.post(
        "http://localhost:5000/api/payment/create",
        {
          name: form.name,
          email: form.email,
          amount: form.amount,
        }
      );

      console.log("Redirecting to:", paymentRes.data.invoice_url);
      window.location.href = paymentRes.data.invoice_url;

    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Check backend.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Reservation Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block font-semibold">Full Name</label>
          <input
            name="name"
            type="text"
            className="border w-full px-3 py-2 rounded"
            onChange={handleChange}
            value={form.name}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold">Email</label>
          <input
            name="email"
            type="email"
            className="border w-full px-3 py-2 rounded"
            onChange={handleChange}
            value={form.email}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold">Phone Number</label>
          <input
            name="phone"
            type="tel"
            maxLength="11"
            placeholder="09xxxxxxxxx"
            className="border w-full px-3 py-2 rounded"
            onChange={handleChange}
            value={form.phone}
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block font-semibold">Date</label>
          <input
            name="reservationDate"
            type="date"
            className="border w-full px-3 py-2 rounded"
            onChange={handleChange}
            value={form.reservationDate}
            required
          />
        </div>

        {/* Time */}
        <div>
          <label className="block font-semibold">Time</label>
          <input
            name="reservationTime"
            type="time"
            className="border w-full px-3 py-2 rounded"
            onChange={handleChange}
            value={form.reservationTime}
            required
          />
        </div>

        {/* Pax */}
        <div>
          <label className="block font-semibold">Number of Guests </label>
          <input
            name="pax"
            type="text"
            placeholder="1"
            className="border w-full px-3 py-2 rounded"
            onChange={handleChange}
            value={form.pax}
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block font-semibold">Downpayment Amount</label>
          <input
            name="amount"
            type="text"
            placeholder="Enter amount"
            className="border w-full px-3 py-2 rounded"
            onChange={handleChange}
            value={form.amount}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
        >
          Pay Now
        </button>

      </form>
    </div>
  );
};

export default Reservation;
