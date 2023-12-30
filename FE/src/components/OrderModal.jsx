import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swalToast from "../helpers/swal";
import { orderCar } from "../stores/actions/orderActions";
import { useDispatch } from "react-redux";

Modal.setAppElement("#root");

function OrderModal({ car, isOpen, onClose }) {
    const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    car_id: car?.id || "",
    order_date: new Date(),
    rentalPeriod: "day",
    pickup_location: "",
    dropoff_location: "",
    pickup_date: null,
    dropoff_date: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: date,
    }));
  };

  const formatDateToString = (date) => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
  
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
  
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.pickup_date || !formData.dropoff_date) {
      swalToast.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields!",
      });
      return;
    }
    const formattedData = {
        ...formData,
        order_date: formatDateToString(formData.order_date),
        pickup_date: formatDateToString(formData.pickup_date),
        dropoff_date: formatDateToString(formData.dropoff_date),
      };
    dispatch(orderCar(formattedData));
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="flex items-center justify-center m-auto w-1/2 bg-white rounded shadow-lg p-8"
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <form onSubmit={handleSubmit} className="w-full">
        <h2 className="text-cyan-900 text-2xl mb-6">
          Rent Car Number #{car?.id}
        </h2>
        <div className="block mb-2">
          <span className="text-cyan-900 block">Order Date:</span>
          <DatePicker
            selected={formData.order_date}
            onChange={(date) => handleDateChange(date, "order_date")}
            dateFormat="dd/MM/yyyy"
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <label className="block mb-2">
          <span className="text-cyan-900">Rental Period:</span>
          <select
            name="rentalPeriod"
            value={formData.rentalPeriod}
            onChange={handleInputChange}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          >
            <option value="day">Per Day</option>
            <option value="month">Per Month</option>
          </select>
        </label>
        <label className="block mb-2">
          <span className="text-cyan-900">Pickup Location:</span>
          <input
            type="text"
            name="pickup_location"
            value={formData.pickup_location}
            onChange={handleInputChange}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          <span className="text-cyan-900">Dropoff Location:</span>
          <input
            type="text"
            name="dropoff_location"
            value={formData.dropoff_location}
            onChange={handleInputChange}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          />
        </label>
        <div className="block mb-2">
          <span className="text-cyan-900 block">Pickup Date:</span>
          <DatePicker
            selected={formData.pickup_date}
            onChange={(date) => handleDateChange(date, "pickup_date")}
            dateFormat="dd/MM/yyyy"
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="block mb-2">
          <span className="text-cyan-900 block">Dropoff Date:</span>
          <DatePicker
            selected={formData.dropoff_date}
            onChange={(date) => handleDateChange(date, "dropoff_date")}
            dateFormat="dd/MM/yyyy"
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-cyan-900 text-white px-4 py-2 rounded-full hover:bg-cyan-700"
        >
          Rent Now
        </button>
      </form>
    </Modal>
  );
}

export default OrderModal;
