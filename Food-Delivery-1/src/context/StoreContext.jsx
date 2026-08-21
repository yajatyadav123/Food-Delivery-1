import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
//import { food_list } from "../assets/frontend_assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const url = "https://food-delivery-1-backend.onrender.com";

  const addToCart = async (itemId) => {
    console.log("Token:", token);
    console.log("Item:", itemId);

    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token: token } },
      );
    }
  };

  const navigate = useNavigate();
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token: token } },
      );
    }
  };

  const getTotalCart = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const iteminfo = food_list.find((product) => product._id === item);

        if (iteminfo) {
          totalAmount += iteminfo.price * cartItems[item];
        }
      }
    }

    return totalAmount;
  };
const loadCartData = async (token) => {
  try {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );

    console.log("Cart API Response:", response.data);

    if (response.data.success) {
      setCartItems(response.data.cartData || {});
    } else {
      setCartItems({});
    }

  } catch (error) {
    console.log("Cart Error:", error);
    setCartItems({});
  }
};



  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCart,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

// this is for useeffect used for saved token
//✅ React state (token) is reset on every page refresh.
//✅ localStorage is not reset on refresh.
//✅ useEffect restores the token from localStorage if it exists.

//   Context solves this problem

//  Instead of passing props through every component, React stores the data in a central place.

//  Any component can access it directly.
//  It is like a wifi route which connects whole home
//                StoreContext
//                     │
//     ┌───────────────┼───────────────┐
//     │               │               │
//  Navbar          FoodDisplay      Cart
//     │               │               │
//     │           FoodItem        PlaceOrder

//  All of them can access the same data.

// createContext()
//       │
//       ▼
//  StoreContext
//       │
//       ▼
//    Provider
//       │
//  value={contextValue}
//       │
//       ▼
//    <App />
//        │
//  ┌─────┼─────────┐
//  │     │         │
// Navbar Home    Cart
// │
// ▼
// useContext(StoreContext)
// │
// ▼
// Gets contextValue

// Answer: They all use useContext(StoreContext) to access the shared data provided by StoreContext.Provider. This lets multiple components read and update the same state without passing props through intermediate components.
// Context acts like a shared storage for your React application. Instead of passing data through props from one component to another, you store shared values (such as the cart, user information, or theme) in a Context, and any component inside the Provider can access or update them directly using useContext().

// for food list we are creating state for transfering data from admin
