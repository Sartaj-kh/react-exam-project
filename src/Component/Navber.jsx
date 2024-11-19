import { useState, useEffect } from "react";
import { FaBell, FaCartShopping } from "react-icons/fa6";
import { CiLight } from "react-icons/ci";

const Navber = ({ onCartClick, cartItemCount }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [cartCount, setCartCount] = useState(cartItemCount); // Manage cart count locally

  useEffect(() => {
    setCartCount(cartItemCount); // Sync with prop when cart items are updated
  }, [cartItemCount]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <div className="fixed top-0 left-0 w-full px-4 flex items-center justify-between py-5 bg-white dark:bg-gray-800 shadow-md z-40">
      <h6 className="text-[#00D991] text-4xl">
        BOOK <span className="text-green-200">SHOP</span>
      </h6>
      <div className="flex gap-5 items-center">
        <button className="border p-2 rounded text-[#2EE0A5] relative">
          <FaBell size={20} />
        </button>
        <button
          onClick={toggleDarkMode}
          className="border p-2 rounded text-[#2EE0A5]"
        >
          <CiLight size={20} />
        </button>
        <button
          onClick={onCartClick}
          className="border p-2 rounded text-[#2EE0A5] relative"
        >
          <FaCartShopping size={20} />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-white bg-[#2EE0A5] text-xs rounded-full p-1">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navber;
