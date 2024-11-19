import { useState } from "react";

const Rightbar = ({ handleSort }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-24">
      {/* Toggle Button for Medium and Smaller Screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-4 bg-gray-700 text-white rounded-md"
      >
        <span>{isOpen ? "Close Filters" : "Open Filters"}</span>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 right-0 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 transition-transform duration-300 w-48 bg-gray-800 p-6 z-40`}
      >
        <h2 className="text-lg font-semibold text-white mb-4">Filter Options</h2>
        <ul className="space-y-4">
          {/* Sort by Name */}
          <li className="hover:bg-green-500 rounded-md transition-shadow">
            <button
              onClick={() => handleSort("name")}
              className="text-gray-300 hover:text-white w-full text-left p-2"
            >
              &gt; By Name
            </button>
          </li>

          {/* Sort by Rating */}
          <li className="hover:bg-green-500 rounded-md">
            <button
              onClick={() => handleSort("rating")}
              className="text-gray-300 hover:text-white w-full text-left p-2"
            >
              &gt; By Rating
            </button>
          </li>

          {/* Sort by Price */}
          <li className="hover:bg-green-500 rounded-md">
            <button
              onClick={() => handleSort("price")}
              className="text-gray-300 hover:text-white w-full text-left p-2"
            >
              &gt; By Price
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Rightbar;
