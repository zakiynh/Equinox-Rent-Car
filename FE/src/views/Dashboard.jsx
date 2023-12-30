import React from "react";
import SidebarComponent from "../components/Sidebar";
import CardCar from "../components/CardCar";

function Dashboard({ children }) {
  return (
    <div className="flex h-screen bg-gray-800">
      <div className="w-64 p-4 bg-cyan-950 text-white fixed top-0 left-0 h-full">
        <h1 className="text-3xl font-extrabold mb-4">Rent Car!</h1>
        <SidebarComponent />
      </div>

      {/* Main content */}
      <div className="ml-64 flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 p-4">
        <main>
          <h2 className="text-2xl font-bold mb-4">
            Welcome to Rent Car Dashboard
          </h2>
          <p>
            Explore our car rental services and find the perfect vehicle for
            your needs.
          </p>
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Why Choose Us?</h3>
            <ul className="list-disc list-inside">
              <li>Wide selection of high-quality vehicles</li>
              <li>Flexible rental options</li>
              <li>Competitive pricing</li>
              {/* Add more points as needed */}
            </ul>
          </div>

          {/* Car list section */}
          <div className="mt-8 max-w-full overflow-x-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <CardCar />
            </div>
          </div>

          {/* Add more content as needed */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
