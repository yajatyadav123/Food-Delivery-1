import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCart, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const OnchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
  event.preventDefault();

  try {
    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItems[item._id],
        });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCart() + 2,
    };

    console.log("Sending order:", orderData);

    const response = await axios.post(
      url + "/api/order/place",
      orderData,
      {
        headers: {
          token: token,
        },
      }
    );

    console.log("Backend response:", response.data);

    if (response.data.success) {
      const { session_url } = response.data;

      window.location.replace(session_url);
    } else {
      alert(response.data.message);
    }

  } catch (error) {
    console.log("Place order error:", error);
    console.log("Server response:", error.response?.data);

    alert(
      error.response?.data?.message ||
      "Something went wrong while placing order"
    );
  }
};
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCart() == 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={OnchangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={OnchangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>

        <input
          required
          name="email"
          onChange={OnchangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          name="street"
          onChange={OnchangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />

        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={OnchangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={OnchangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>

        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={OnchangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip Code"
          />
          <input
            required
            name="country"
            onChange={OnchangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>

        <input
          required
          name="phone"
          onChange={OnchangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>

      {/* Right Side */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCart()}</p>
          </div>
          <hr />

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCart() === 0 ? 0 : 2}</p>
          </div>
          <hr />

          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCart() === 0 ? 0 : getTotalCart() + 2}</b>
          </div>
          <hr />

          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
