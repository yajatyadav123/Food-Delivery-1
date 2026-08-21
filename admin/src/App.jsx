import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidbar from './components/Sidbar/Sidbar';
import { Route, Routes } from 'react-router-dom';
import Orders from './pages/Orders/Orders';
import List from './pages/List/List';
import Add from './pages/Add/Add';
import Login from './pages/Login/Login';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ url }) => {

  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <div>

      <ToastContainer />

      {!token ? (

        <Login
          url={url}
          setToken={setToken}
        />

      ) : (

        <>
          <Navbar setToken={setToken} />

          <hr />

          <div className="app-content">

            <Sidbar />

            <Routes>

              <Route
                path="/"
                element={<Orders url={url} />}
              />

              <Route
                path="/orders"
                element={<Orders url={url} />}
              />

              <Route
                path="/add"
                element={<Add url={url} />}
              />

              <Route
                path="/list"
                element={<List url={url} />}
              />

            </Routes>

          </div>

        </>

      )}

    </div>
  );
};

export default App;