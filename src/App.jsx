import { useState, useEffect } from "react";
import Navber from "./Component/Navber";
import Leftbar from "./Component/Leftbar";
import Middlebar from "./Component/MiddleBar";
import Rightbar from "./Component/Rightbar";
import Cart from "./Component/Cart";
import Footer from "./Component/Footer";
import { bookData } from "./data/data"; // Directly import bookData

const App = () => {
  const [gallery, setGallery] = useState(bookData);  // use bookData directly
  const [filteredGallery, setFilteredGallery] = useState(bookData);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  // Filter Function
  useEffect(() => {
    let filtered = [...gallery];

    if (searchQuery) {
      filtered = filtered.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (showFavorites) {
      filtered = filtered.filter((book) => favorites.includes(book));
    } else if (selectedCategory) {
      filtered = filtered.filter((book) => book.status === selectedCategory);
    }

    setFilteredGallery(filtered);
  }, [searchQuery, showFavorites, selectedCategory, gallery, favorites]);

  // Sort Function
  const handleSort = (criteria) => {
    let sortedGallery = [...filteredGallery];

    if (criteria === "name") {
      sortedGallery.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === "rating") {
      sortedGallery.sort((a, b) => b.rating - a.rating);
    } else if (criteria === "price") {
      sortedGallery.sort((a, b) => a.price - b.price);
    }

    setFilteredGallery(sortedGallery);
  };

  // Add to Cart Function
  const addToCart = (book) => {
    const existingItem = cartItems.find((item) => item.id === book.id);
    if (existingItem) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...book, quantity: 1 }]);
    }
  };

  // Handle Quantity Change
  const handleQuantityChange = (id, increase) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: increase ? item.quantity + 1 : item.quantity - 1,
            }
          : item
      )
    );
  };

  // Delete Item
  const handleDeleteItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Toggle Favorite
  const toggleFavorite = (book) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(book)
        ? prevFavorites.filter((fav) => fav !== book)
        : [...prevFavorites, book]
    );
  };

  // Reset Filters (All Books)
  const resetFilters = () => {
    setFilteredGallery(gallery);
    setSelectedCategory(null);
    setShowFavorites(false);
    setSearchQuery("");
  };

  return (
    <div className="bg-gray-900 text-white">
      <Navber
        onCartClick={() => setIsCartOpen(true)}
        cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
      />
      <div className="flex container mx-auto">
        <Leftbar
          setFilter={(category) => {
            setSelectedCategory(category);
            setShowFavorites(false);
          }}
          setSearchQuery={setSearchQuery}  // Set search query prop
          showFavorites={() => setShowFavorites(true)}
          resetFilters={resetFilters}
          favorites={favorites}
        />
        <Middlebar
          gallery={filteredGallery}
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
          favorites={favorites}
        />
        <Rightbar handleSort={handleSort} />
      </div>
      {isCartOpen && (
        <Cart
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onQuantityChange={handleQuantityChange}
          onDeleteItem={handleDeleteItem}
        />
      )}
      <Footer />
    </div>
  );
};

export default App;
