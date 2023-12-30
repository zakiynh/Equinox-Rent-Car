import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCar } from "../stores/actions/carActions";
import OrderModal from "./OrderModal";

function CardCar() {
  const dispatch = useDispatch();
  const carData = useSelector((state) => state.cars.car);

  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 8;

  useEffect(() => {
    dispatch(fetchCar());
  }, [dispatch]);

  const openModal = (car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setModalOpen(false);
  };

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = carData.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginationContainerStyle = {
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    bottom: "30px",
    left: "57%",
    transform: "translateX(-50%)", 
  };

  const paginationButtonStyle = {
    marginRight: "8px", 
  };

  return (
    <>
      {currentCars.map((car) => (
        <div
          key={car.id}
          className="bg-white rounded-lg overflow-hidden shadow-md p-4"
        >
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-32 object-cover mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
          <p className="text-gray-600 mb-2">Price per-Day: ${car.day_rate}</p>
          <p className="text-gray-600 mb-2">
            Price per-Month: ${car.month_rate}
          </p>
          <button
            className="bg-cyan-950 text-white py-2 px-4 rounded-full"
            onClick={() => openModal(car)}
          >
            Rent Car
          </button>
        </div>
      ))}

      {/* Render Pagination */}
      <div style={paginationContainerStyle}>
        {Array.from({ length: Math.ceil(carData.length / carsPerPage) }).map(
          (item, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`pagination-button ${
                index + 1 === currentPage ? "active" : ""
              }`}
              style={paginationButtonStyle}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      {/* Render the modal */}
      {selectedCar && (
        <OrderModal car={selectedCar} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </>
  );
}

export default CardCar;
