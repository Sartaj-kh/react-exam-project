import { FaRegHeart } from "react-icons/fa";

const ModalMaking = ({ book, onClose, onAddToCart }) => {
  if (!book) {
    return null;
  }

 console.log(book);
 

  return (
    <div className="w-2/4 h-80 border bg-slate-800 text-white rounded flex">
      <div className="p-7">
        <div>
          <h2 className="text-3xl pt-5 pb-3">{book.name}</h2>
          <p>{book.category}</p>
          <p className="pt-6">{book.description}</p>
        </div>
        <div className="flex gap-7 ps-7 pt-5">
          <button
            className="bg-green-500 text-white px-4 py-1 rounded"
            onClick={() => {
              console.log("Add to Cart Clicked"); // Debugging log
              onAddToCart(book);
            }}
          >
            Add to cart
          </button>
          <div className="hover:bg-green-500 flex items-center gap-4 px-4 py-2 text-left text-white rounded-md cursor-pointer">
            <FaRegHeart />
          </div>
          <button
            onClick={onClose}
            className="border bg-slate-100 rounded text-black font-semibold p-2"
          >
            Close
          </button>
        </div>
      </div>
      <img
        src={book.image}
        alt="modal book"
        className="object-cover rounded-md mb-4 cursor-pointer h-72"
      />
    </div>
  );
};
export default ModalMaking;

