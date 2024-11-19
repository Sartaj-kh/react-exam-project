import React, { useState, useEffect } from "react";
import {
  FaFire,
  FaFolderPlus,
  FaRegHeart,
  FaSearch,
  FaBook,
} from "react-icons/fa";
import { MdOutlineUpcoming } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";
import BookSearch from "./BookSearch"; 
import FavoriteModal from "./FavoriteModal"; 

const Leftbar = ({ setFilter, setSearchQuery, favorites }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoriteModalOpen, setIsFavoriteModalOpen] = useState(false);

  const handleSearchOpen = () => setIsSearchOpen(true);
  const handleSearchClose = () => setIsSearchOpen(false);

  const handleEscKey = (e) => {
    if (e.key === "Escape") {
      handleSearchClose();
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      window.addEventListener("keydown", handleEscKey);
    } else {
      window.removeEventListener("keydown", handleEscKey);
    }
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isSearchOpen]);

  const handleFavoriteClick = () => {
    setIsFavoriteModalOpen(true);
  };

  const handleCloseFavoriteModal = () => {
    setIsFavoriteModalOpen(false);
  };

  return (
    <div className="mt-24 flex-wrap">
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-4">
        <RiMenu2Fill size={24} className="text-white" />
      </button>

      <aside
        className={`fixed md:static inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 w-64 bg-gray-800 p-6 z-40`}
      >
        <div className="relative w-full mb-4">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-gray-400" />
          </span>
          <input
            type="search"
            placeholder="Quick search..."
            onClick={handleSearchOpen}
            className="w-full pl-10 p-2 rounded bg-gray-700 text-gray-300 focus:outline-none cursor-pointer"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <nav className="space-y-2">
          <div
            onClick={() => setFilter("trending")}
            className="hover:bg-green-500 flex items-center gap-4 w-full px-4 py-2 text-left text-white rounded-md cursor-pointer"
          >
            <FaFire />
            <button>Trending</button>
          </div>
          <div
            onClick={() => setFilter("new_releases")}
            className="hover:bg-green-500 flex items-center gap-4 w-full px-4 py-2 text-left text-white rounded-md cursor-pointer"
          >
            <FaFolderPlus />
            <button>New Releases</button>
          </div>
          <div
            onClick={() => setFilter("coming_soon")}
            className="hover:bg-green-500 flex items-center gap-4 w-full px-4 py-2 text-left text-white rounded-md cursor-pointer"
          >
            <MdOutlineUpcoming />
            <button>Coming Soon</button>
          </div>
          <div
            onClick={() => {
              setFilter(null);
              setSearchQuery("");
              handleSearchClose();
            }}
            className="hover:bg-green-500 flex items-center gap-4 w-full px-4 py-2 text-left text-white rounded-md cursor-pointer"
          >
            <FaBook />
            <button>All Books</button>
          </div>
          <div
            onClick={handleFavoriteClick}
            className="hover:bg-green-500 flex items-center gap-4 w-full px-4 py-2 text-left text-white rounded-md cursor-pointer"
          >
            <FaRegHeart />
            <button>Favorites</button>
          </div>
        </nav>
      </aside>

      {isSearchOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <BookSearch onClose={handleSearchClose} setSearchQuery={setSearchQuery} />
        </div>
      )}

      {isFavoriteModalOpen && (
        <FavoriteModal
          onClose={handleCloseFavoriteModal}
          favorites={favorites}
        />
      )}
    </div>
  );
};

export default Leftbar;
