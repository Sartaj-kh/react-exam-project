import { MdOutlineDelete } from "react-icons/md";
import { SlClose } from "react-icons/sl";

const Cart = ({ onClose, cartItems, onQuantityChange, onDeleteItem }) => {
  const calculateTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      <div className="bg-gray-900 text-white p-6 rounded-lg w-11/12 md:w-4/5 lg:w-3/5 xl:w-1/2 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
          aria-label="Close Cart"
        >
          <SlClose size={24} />
        </button>

        {/* Cart Header */}
        <h3 className="text-2xl font-bold text-center mb-6">Your Carts</h3>

        {/* Table Headers */}
        <div className="grid grid-cols-12 text-gray-400 text-sm font-semibold mb-4 px-4">
          <span className="col-span-5">Product</span>
          <span className="col-span-2 text-center">Price</span>
          <span className="col-span-2 text-center">Quantity</span>
          <span className="col-span-2 text-center">Total</span>
          <span className="col-span-1 text-center">Action</span>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Cart Items */}
          <div className="flex-1 max-h-96 overflow-y-auto space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 items-center bg-gray-800 p-4 rounded-lg shadow-md"
              >
                {/* Product Details */}
                <div className="col-span-5 flex items-center space-x-4">
                  <img
                    src={`/src/assets/images/${item.image}`}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-400">{item.topic}</p>
                  </div>
                </div>

                {/* Price */}
                <p className="col-span-2 text-center text-green-400 font-semibold">
                  ${item.price}
                </p>

                {/* Quantity */}
                <div className="col-span-2 flex justify-center items-center rounded-full bg-gray-700 px-12">
                  <button
                    className="px-1 py-1 rounded-l-md text-white font-semibold"
                    onClick={() => onQuantityChange(item.id, false)} // Decrease quantity
                  >
                    -
                  </button>
                  <span className="px-4 text-lg">{item.quantity}</span>
                  <button
                    className="px-1 py-1 rounded-r-md text-white"
                    onClick={() => onQuantityChange(item.id, true)} // Increase quantity
                  >
                    +
                  </button>
                </div>

                {/* Total Price */}
                <p className="col-span-2 text-center text-green-400 font-semibold">
                  ${item.price * item.quantity}
                </p>

                {/* Delete Button */}
                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="col-span-1 flex justify-center items-center text-red-600 hover:text-red-500"
                >
                  <MdOutlineDelete size={24} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-md mt-6 lg:mt-0">
            <h4 className="text-xl font-semibold mb-4">Order Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={onClose}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
