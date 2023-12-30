import React from "react";
import SidebarComponent from "../components/Sidebar";
import CardCar from "../components/CardCar";

function CarList() {
  return (
    <div className="flex h-screen bg-gray-800">
      <div className="w-64 p-4 bg-cyan-950 text-white fixed top-0 left-0 h-full">
        <h1 className="text-3xl font-extrabold mb-4">Car List</h1>
        <SidebarComponent />
      </div>

      <div className="ml-64 flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 p-4">
        <div className="mt-8 max-w-full overflow-x-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <CardCar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarList;
