import React, { useEffect } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  const [items, setItems] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false);

  useEffect(() => {
    fetch('https://64020cd7ab6b7399d0b2a6df.mockapi.io/items')
      .then(res => res.json())
      .then(res => setItems(res));
  }, [])

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer onClickClose={() => setCartOpened(false)}/>}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex align-center">
            <img height={16} width={16} src="img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap" >
          {items.map(obj => (
            <Card
              title={obj.title}
              price={obj.price}
              image={obj.image}
              onFavorite={() => console.log('Добавили в закладки')}
              onPlus={() => console.log('Нажали плюс')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
