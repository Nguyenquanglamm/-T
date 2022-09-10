import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Cartcontext = createContext();

const CartProvider = (props) => {
  const [storedValueCart, setValueCart] = useLocalStorage("cart", []);
  const [cartItems, setCartItems] = useState(storedValueCart);

  const calcQuantity = () => {
    return cartItems.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  };

  const [quantity, setQuantity] = useState(calcQuantity);

  const addToCart = (newItem) => {
    if (
      cartItems.some((item) => {
        return (
          item._id === newItem._id &&
          item.mausac === newItem.mausac &&
          item.dungLuong === newItem.dungLuong
        );
      })
    ) {
      toast.warn("Sản phẩm đã có trong giỏ hàng", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setCartItems((prevItem) => [...prevItem, newItem]);
      localStorage.setItem("cart", JSON.stringify([...cartItems, newItem]));
      const notify = () =>
        toast.success("Thêm sản phẩm vào giỏ hàng thành công", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      notify();
    }
  };

  const addToCartFromDetail = (newItem, colorActive, sizeActive) => {
    if (colorActive === null || sizeActive == null) {
      const notify = () =>
        toast.warn("Vui lòng chọn màu và kích thước sản phẩm", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      notify();
    } else if (
      cartItems.some((item) => {
        return (
          item._id === newItem._id &&
          item.mausac === newItem.mausac &&
          item.dungLuong === newItem.dungLuong
        );
      })
    ) {
      toast.warn("Sản phẩm đã có trong giỏ hàng", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setCartItems((prevItem) => [...prevItem, newItem]);
      localStorage.setItem("cart", JSON.stringify([...cartItems, newItem]));
      const notify = () =>
        toast.success("Thêm sản phẩm vào giỏ hàng thành công", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      notify();
    }
  };

  const removeToCart = (id, mausac, dungLuong) => {
    const cartListItem = JSON.parse(localStorage.getItem("cart"));

    const newCartItems = cartListItem.filter((item) => {
      if (
        item._id !== id ||
        item.mausac !== mausac ||
        item.dungLuong !== dungLuong
      )
        return true;
      return false;
    });
    setValueCart(newCartItems);
    setCartItems(newCartItems);
    setQuantity(calcQuantity);
  };

  const updateQuantityIncrement = (index, cartItems) => {
    cartItems[index] = {
      ...cartItems[index],
      quantity: cartItems[index].quantity + 1,
    };
    setValueCart(cartItems);
    setQuantity(calcQuantity);
    setCartItems(cartItems);
  };
  const updateQuantityDecrement = (index, cartItems) => {
    if (cartItems[index].quantity === 1) return;
    cartItems[index] = {
      ...cartItems[index],
      quantity: cartItems[index].quantity - 1,
    };
    setValueCart(cartItems);
    setQuantity(calcQuantity);
    setCartItems(cartItems);
  };

  const handleQuantityChange = (index, cartItems, quantity, maxQ = null) => {
    if (cartItems[index].quantity < 1) return;
    if (maxQ) {
      cartItems[index] = {
        ...cartItems[index],
        quantity: +maxQ,
      };
    } else {
      cartItems[index] = {
        ...cartItems[index],
        quantity: +quantity,
      };
    }

    setValueCart(cartItems);
    setQuantity(calcQuantity);
    setCartItems(cartItems);
  };

  const totalPrice = () => {
    return cartItems.reduce((acc, item) => {
      return acc + item.quantity * item.donGia;
    }, 0);
  };

  const clearAllData = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };
  const values = {
    addToCart,
    cartItems,
    setCartItems,
    setValueCart,
    removeToCart,
    updateQuantityIncrement,
    updateQuantityDecrement,
    quantity,
    calcQuantity,
    totalPrice,
    addToCartFromDetail,
    handleQuantityChange,
    clearAllData,
  };
  return (
    <Cartcontext.Provider value={values} {...props}></Cartcontext.Provider>
  );
};

const useCart = () => {
  const cartContext = useContext(Cartcontext);
  if (typeof cartContext === "undefined")
    throw new Error("Component must use within Provider");

  return cartContext;
};

export { CartProvider, useCart };
