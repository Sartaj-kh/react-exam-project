import { FaRegHeart, FaHeart } from "react-icons/fa"; // Added FaHeart for toggling the icon

const Bookcard = ({
  gallery,
  onImageClick,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
}) => {

  return (
    <div className="bg-gray-800 mt-20 p-4 rounded-lg border border-gray-700 shadow-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto z-10">
      {/* Book Image */}
      <img
        src={gallery.image}
        alt="Book Cover"
        className="w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover rounded-md mb-4 cursor-pointer hover:scale-105 transition-transform duration-300 dark:brightness-75"
        onClick={onImageClick}
      />

      {/* Book Details */}
      <h2 className="text-2xl font-semibold ">{gallery.name}</h2>
      <p className="text-white/35 ">{gallery.author}</p>
      <p className="text-gray-400 ">{gallery.topic}</p>

      {/* Book Rating */}
      <div className="flex items-center mt-2 ms-3">
        <span className="text-green-500 text-3xl">
          {"★".repeat(gallery.rating)}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-8 items-center mt-4 px-4">
        {/* Add to Cart Button */}
        <button
          className="bg-green-500 text-white px-2 rounded w-52 h-12 hover:bg-green-600"
          onClick={() => onAddToCart(gallery)}
        >
          <span className="text-lg font-bold">${gallery.price}</span> | Add to Cart
        </button>

        {/* Favorite Icon */}
        <span
          className={`border p-3 cursor-pointer text-2xl ${
            isFavorite ? "text-green-500" : "text-red-400"
          }`}
          onClick={() => onToggleFavorite(gallery)}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </span>
      </div>
    </div>
  );
};

export default Bookcard;
