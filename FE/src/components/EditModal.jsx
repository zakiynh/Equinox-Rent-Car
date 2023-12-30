import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

Modal.setAppElement("#root");

function EditModal({ isOpen, closeModal, order, updateOrder }) {
  if (!order) return null;

  const [editedOrder, setEditedOrder] = useState({
    car_id: order?.car_id || "",
    order_date: order?.order_date ? new Date(order?.order_date) : null,
    pickup_date: order?.pickup_date ? new Date(order?.pickup_date) : null,
    dropoff_date: order?.dropoff_date ? new Date(order?.dropoff_date) : null,
    pickup_location: order?.pickup_location || "",
    dropoff_location: order?.dropoff_location || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleDateChange = (date, field) => {
    setEditedOrder((prevOrder) => ({
      ...prevOrder,
      [field]: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOrder(order.id, editedOrder);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
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
        <h2 className="text-cyan-900 text-2xl mb-6">Edit Order #{order?.id}</h2>
        <label className="block mb-2">
          <span className="text-cyan-900">Car ID:</span>
          <input
            type="text"
            name="car_id"
            value={editedOrder.car_id}
            readOnly
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          />
        </label>
        <div className="block mb-2">
          <span className="text-cyan-900 block">Order Date:</span>
          <DatePicker
            selected={editedOrder.order_date}
            onChange={(date) => handleDateChange(date, "order_date")}
            dateFormat="dd/MM/yyyy"
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="block mb-2">
          <span className="text-cyan-900 block">Pickup Date:</span>
          <DatePicker
            selected={editedOrder.pickup_date}
            onChange={(date) => handleDateChange(date, "pickup_date")}
            dateFormat="dd/MM/yyyy"
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="block mb-2">
          <span className="text-cyan-900 block">Dropoff Date:</span>
          <DatePicker
            selected={editedOrder.dropoff_date}
            onChange={(date) => handleDateChange(date, "dropoff_date")}
            dateFormat="dd/MM/yyyy"
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <label className="block mb-2">
          <span className="text-cyan-900">Pickup Location:</span>
          <input
            type="text"
            name="pickup_location"
            value={editedOrder.pickup_location}
            onChange={handleChange}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          />
        </label>
        <label className="block mb-2">
          <span className="text-cyan-900">Dropoff Location:</span>
          <input
            type="text"
            name="dropoff_location"
            value={editedOrder.dropoff_location}
            onChange={handleChange}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          />
        </label>
        <button
          type="submit"
          className="mt-4 bg-cyan-900 text-white px-4 py-2 rounded-full hover:bg-cyan-700"
        >
          Update Order
        </button>
      </form>
    </Modal>
  );
}

export default EditModal;
