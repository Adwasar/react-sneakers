import React, { useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import HomePage from "./Pages/HomePage";
import FavoritesPage from "./Pages/FavoritesPage";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCardItems] = React.useState([]);
  const [facoriteItems, setFavoriteItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  useEffect(() => {
    axios
      .get("https://64020cd7ab6b7399d0b2a6df.mockapi.io/items")
      .then((res) => setItems(res.data));

    axios
      .get("https://64020cd7ab6b7399d0b2a6df.mockapi.io/cart")
      .then((res) => setCardItems(res.data));
  }, []);

  const deleteItem = async (id) => {
    await axios.delete(
      `https://64020cd7ab6b7399d0b2a6df.mockapi.io/cart/${id}`
    );
    axios
      .get("https://64020cd7ab6b7399d0b2a6df.mockapi.io/cart")
      .then((res) => setCardItems(res.data));
  };

  const getData = async () => {
    await axios
      .get("https://my-json-server.typicode.com/Adwasar/react-sneakers/favorites")
      .then((res) => console.log(res.data));
  };

  return (
    <div onClick={getData} className="wrapper clear">
      <Header onClickCart={() => setCartOpened(true)} />
      <main>
        <div className="content p-40">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  items={items}
                  setItems={setItems}
                  deleteItem={deleteItem}
                  setCardItems={setCardItems}
                  cartItems={cartItems}
                />
              }
            />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
        {cartOpened && (
          <Drawer
            cartItems={cartItems}
            items={items}
            onClickClose={() => setCartOpened(false)}
            removeItem={(card) => deleteItem(card.id)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
