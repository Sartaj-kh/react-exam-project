import { SlClose } from "react-icons/sl";

const FavoriteModal = ({ onClose, favorites }) => { // favorites প্রপ যোগ
  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="favorite-modal-title"
    >
      <div className="bg-gray-900 text-white p-6 rounded-lg w-11/12 md:w-4/5 lg:w-1/3 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
          aria-label="Close Modal"
        >
          <SlClose size={24} />
        </button>

        <div className="flex flex-col justify-center items-center space-y-4">
          <h3 id="favorite-modal-title" className="text-xl font-semibold text-center">
            Your Favorite Books
          </h3>
          {favorites.length > 0 ? (
            <ul className="space-y-2">
              {favorites.map((book) => (
                <li key={book.id} className="text-gray-400 text-center">
                  {book.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 text-center">
              You have no items marked as favorites. Add some to see them here!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteModal;
