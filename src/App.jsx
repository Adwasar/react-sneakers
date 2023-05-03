import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import DataContext from './context';
import Header from './components/Header';
import Drawer from './components/Drawer';
import HomePage from './Pages/HomePage';
import FavoritesPage from './Pages/FavoritesPage';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteStorageItems, setFavoriteStorageItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [isDownloading, setIsDownloading] = useState(true);

  useEffect(() => {
    const loadingItems = async () => {
      await axios
        .get('https://64020cd7ab6b7399d0b2a6df.mockapi.io/items')
        .then((res) => setItems(res.data))
        .catch((error) => alert(error));

      await axios
        .get('https://64020cd7ab6b7399d0b2a6df.mockapi.io/cart')
        .then((res) => setCartItems(res.data))
        .catch((error) => alert(`Cards weren't added to cart: "${error}"`));

      setIsDownloading(false);
    };

    loadingItems();

    const likedItemsStorage = JSON.parse(
      localStorage.getItem('favoriteStorageItems')
    );
    if (likedItemsStorage) {
      setFavoriteStorageItems(likedItemsStorage);
    }
    setLikedItems(likedItemsStorage);
  }, []);

  useEffect(() => {
    const handleUnload = () => {
      localStorage.setItem('favoriteStorageItems', JSON.stringify(likedItems));
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [likedItems]);

  useEffect(() => {
    localStorage.setItem(
      'favoriteStorageItems',
      JSON.stringify(favoriteStorageItems)
    );
  }, [favoriteStorageItems]);

  useEffect(() => {
    setCartTotal(cartItems.reduce((acc, item) => acc + item.price, 0));
  }, [cartItems]);

  const deleteCartItem = (id) => {
    axios
      .delete(`https://64020cd7ab6b7399d0b2a6df.mockapi.io/cart/${id}`)
      .then(() => {
        axios
          .get('https://64020cd7ab6b7399d0b2a6df.mockapi.io/cart')
          .then((res) => setCartItems(res.data))
          .catch((error) => alert(`что-то пошло не так : "${error}"`));
      })
      .catch((error) => alert(`что-то пошло не так : "${error}"`));
  };

  const addCartItem = async (currentCard) => {
    const isItemOnCart = cartItems.filter(
      (cartItem) =>
        cartItem.title === currentCard.title &&
        cartItem.image === currentCard.image
    );

    if (!isItemOnCart.length) {
      await axios.post(
        'https://64020cd7ab6b7399d0b2a6df.mockapi.io/cart',
        currentCard
      );
    } else {
      const id = isItemOnCart[0].id;
      deleteCartItem(id);
    }

    await axios
      .get('https://64020cd7ab6b7399d0b2a6df.mockapi.io/cart')
      .then((res) => dataContext.setCartItems(res.data));
  };

  const dataContext = {
    items,
    cartItems,
    setCartItems,
    favoriteStorageItems,
    setFavoriteStorageItems,
    cartTotal,
    likedItems,
    setLikedItems,
    addCartItem,
    isDownloading
  };

  return (
    <DataContext.Provider value={dataContext}>
      <div className="wrapper clear">
        <Header onClickCart={() => setCartOpened(true)} />
        <main>
          <div className="content p-40">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </div>
          {cartOpened && (
            <Drawer
              onClickClose={() => setCartOpened(false)}
              deleteCartItem={(card) => deleteCartItem(card.id)}
            />
          )}
        </main>
      </div>
    </DataContext.Provider>
  );
}

export default App;
