import React from 'react';
import axios from 'axios';
import Card from '../components/Card';
import DataContext from '../context';

function HomePage({ deleteItem }) {
  const [searchValue, setSearchValue] = React.useState('');

  const dataContext = React.useContext(DataContext);

  const handleChangeSearch = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex align-center">
          <img height={16} width={16} src="img/search.svg" alt="Search" />
          <input
            onChange={handleChangeSearch}
            value={searchValue}
            placeholder="Поиск..."
          />
          {searchValue && (
            <img
              onClick={() => setSearchValue('')}
              className="close-btn"
              src="/img/btn-remove.svg"
              alt="Close"
            />
          )}
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {dataContext.items
          .filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()),
          )
          .map((obj, i) => {
            const onClickPlus = async () => {
              const isItemOnServer = dataContext.cartItems.filter(
                (el) => el.title === obj.title && el.image === obj.image,
              );

              if (!isItemOnServer.length) {
                await axios.post(
                  'https://64020cd7ab6b7399d0b2a6df.mockapi.io/cart',
                  obj,
                );
              } else {
                const id = isItemOnServer[0].id;
                deleteItem(id);
              }

              await axios
                .get('https://64020cd7ab6b7399d0b2a6df.mockapi.io/cart')
                .then((res) => dataContext.setCartItems(res.data));
            };

            return (
              <Card
                key={i}
                item={obj}
                title={obj.title}
                price={obj.price}
                image={obj.image}
                onClickPlus={onClickPlus}
              />
            );
          })}
      </div>
    </>
  );
}

export default HomePage;
