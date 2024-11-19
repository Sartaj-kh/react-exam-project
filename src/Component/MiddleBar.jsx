import { useState } from "react";
import Bookcard from "./Bookcard";
import ModalMaking from "./ModalMaking";

const Middlebar = ({ gallery, onAddToCart, onToggleFavorite, favorites }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <main className="flex-1 p-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {gallery.map((galleryItem) => (
          <Bookcard
            key={galleryItem.id}
            gallery={galleryItem}
            onImageClick={() => handleOpenModal(galleryItem)}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favorites.includes(galleryItem)}
            inCart={galleryItem.inCart}
          />
        ))}
      </div>

      {/* grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-7 */}

      {isModalOpen && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <ModalMaking
            book={selectedBook}
            onClose={handleCloseModal}
            onAddToCart={onAddToCart}
          />
        </div>
      )}
    </main>
  );
};

export default Middlebar;
