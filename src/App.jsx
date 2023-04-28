import React, { useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import DataContext from "./context";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import HomePage from "./Pages/HomePage";
import FavoritesPage from "./Pages/FavoritesPage";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCardItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  const dataContext = {
    cartItems: cartItems,
    setCardItems: setCardItems,
    favoriteItems: favoriteItems,
    setFavoriteItems: setFavoriteItems,
    items: items,
  };

  useEffect(() => {
    axios
      .get("https://64020cd7ab6b7399d0b2a6df.mockapi.io/items")
      .then((res) => setItems(res.data));

    axios
      .get("https://64020cd7ab6b7399d0b2a6df.mockapi.io/cart")
      .then((res) => setCardItems(res.data));

    const storedFavorite = JSON.parse(localStorage.getItem("favoriteItems"));
    if (storedFavorite) {
      setFavoriteItems(storedFavorite);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  const deleteItem = async (id) => {
    await axios.delete(
      `https://64020cd7ab6b7399d0b2a6df.mockapi.io/cart/${id}`
    );
    axios
      .get("https://64020cd7ab6b7399d0b2a6df.mockapi.io/cart")
      .then((res) => setCardItems(res.data));
  };

  return (
    <DataContext.Provider value={dataContext}>
      <div className="wrapper clear">
        <Header onClickCart={() => setCartOpened(true)} />
        <main>
          <div className="content p-40">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage setItems={setItems} deleteItem={deleteItem} />
                }
              />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </div>
          {cartOpened && (
            <Drawer
              onClickClose={() => setCartOpened(false)}
              removeItem={(card) => deleteItem(card.id)}
            />
          )}
        </main>
      </div>
    </DataContext.Provider>
  );
}

export default App;
