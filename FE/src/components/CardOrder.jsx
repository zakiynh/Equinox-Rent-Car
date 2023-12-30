import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder, cancelOrder, updateOrder } from "../stores/actions/orderActions";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import EditModal from "./EditModal";

function CardOrder() {
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.orders.order);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  const openEditModal = (order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedOrder(null);
    setIsEditModalOpen(false);
  };

  const updateOrderHandler = (orderId, updatedOrder) => {
    dispatch(updateOrder(orderId, updatedOrder));
  };

  const cancelOrderhandler = (orderId) => {
    dispatch(cancelOrder(orderId));
  };
  return (
    <>
      {Array.isArray(orderData) &&
        orderData.map((order) => {
          const orderDate = new Date(order.order_date).toLocaleDateString('en-GB');
          const pickupDate = new Date(order.pickup_date).toLocaleDateString('en-GB');
          const dropoffDate = new Date(order.dropoff_date).toLocaleDateString('en-GB');
          return (
            <div
              key={order.id}
              className="bg-white p-4 mb-4 rounded-lg shadow-md text-cyan-900"
            >
              <h3 className="text-xl font-bold mb-2">Order #{order.id}</h3>
              <p>
                <strong>Car ID:</strong> {order.car_id}
              </p>
              <p>
                <strong>Order Date:</strong> {orderDate}
              </p>
              <p>
                <strong>Pickup Date:</strong> {pickupDate}
              </p>
              <p>
                <strong>Dropoff Date:</strong> {dropoffDate}
              </p>
              <p>
                <strong>Pickup Location:</strong> {order.pickup_location}
              </p>
              <p>
                <strong>Dropoff Location:</strong> {order.dropoff_location}
              </p>
              <div className="flex justify-between items-center mt-2">
                <button
                  className="bg-cyan-950 text-white py-2 px-4 rounded-full flex items-center"
                  onClick={() => openEditModal(order)}
                >
                  <FaPencilAlt className="mr-2" />
                  <span className="text-sm">Edit Order</span>
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-full flex items-center"
                  onClick={() => cancelOrderhandler(order.id)}
                >
                  <FaTimes className="mr-2" />
                  <span className="text-sm">Cancel Order</span>
                </button>
              </div>
            </div>
          );
        })}

      {/* Modal untuk Edit Order */}
      <EditModal
        isOpen={isEditModalOpen}
        closeModal={closeEditModal}
        order={selectedOrder}
        updateOrder={updateOrderHandler}
      />
    </>
  );
}

export default CardOrder;
