import React, { useEffect } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  const [items, setItems] = React.useState([]);
  const [addedItems, setAddedItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  useEffect(() => {
    fetch("https://64020cd7ab6b7399d0b2a6df.mockapi.io/items")
      .then((res) => res.json())
      .then((res) => setItems(res));
  }, []);

  const handleChangeSearch = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          addedItems={addedItems}
          items={items}
          onClickClose={() => setCartOpened(false)}
          removeItem={(card) =>
            setAddedItems((prev) => [...prev.filter((el) => el !== card)])
          }
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            {searchValue ? `Поиск по: "${searchValue}"` : "Все кроссовки"}
          </h1>
          <div className="search-block d-flex align-center">
            <img height={16} width={16} src="img/search.svg" alt="Search" />
            <input
              onChange={handleChangeSearch}
              value={searchValue}
              placeholder="Поиск..."
            />
            {searchValue && (
              <img
                onClick={() => setSearchValue("")}
                className="close-btn"
                src="/img/btn-remove.svg"
                alt="Close"
              />
            )}
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((obj, i) => {
              obj.key = i;

              const onClickPlus = () => {
                if (!addedItems.includes(obj)) {
                  setAddedItems((prev) => [...prev, obj]);
                } else {
                  setAddedItems([...addedItems.filter((el) => el !== obj)]);
                }
              };

              return (
                <Card
                  key={i}
                  item={obj}
                  title={obj.title}
                  price={obj.price}
                  image={obj.image}
                  addedItems={addedItems}
                  onClickPlus={onClickPlus}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
