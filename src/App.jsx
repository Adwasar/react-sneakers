import React, { useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import HomePage from "./Pages/HomePage";
import FavoritesPage from "./Pages/FavoritesPage";

function App() {
  const [items, setItems] = React.useState([]);
  const [addedItems, setBackAddedItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  useEffect(() => {
    axios
      .get("https://64020cd7ab6b7399d0b2a6df.mockapi.io/items")
      .then((res) => setItems(res.data));

    axios
      .get("https://64020cd7ab6b7399d0b2a6df.mockapi.io/cart")
      .then((res) => setBackAddedItems(res.data));
  }, []);

  const deleteItem = async (id) => {
    await axios.delete(
      `https://64020cd7ab6b7399d0b2a6df.mockapi.io/cart/${id}`
    );
    axios
      .get("https://64020cd7ab6b7399d0b2a6df.mockapi.io/cart")
      .then((res) => setBackAddedItems(res.data));
  };

  return (
    <div className="wrapper clear">
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
                  setBackAddedItems={setBackAddedItems}
                  addedItems={addedItems}
                />
              }
            />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
        {cartOpened && (
          <Drawer
            addedItems={addedItems}
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
