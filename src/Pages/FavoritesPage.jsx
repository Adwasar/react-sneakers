import React from "react";
import axios from "axios";
import DataContext from "../context";

import Card from "../components/Card";

function FavoritesPage() {
  const dataContext = React.useContext(DataContext);

  return (
    <>
      <h1 style={{height: 47.5}} className="mb-40" >Избранное:</h1>
      <div className="d-flex flex-wrap">
        {dataContext.favoriteItems.map((obj, i) => {
          const onClickPlus = async () => {
            const isItemOnServer = dataContext.cartItems.filter(
              (el) => el.title === obj.title && el.image === obj.image
            );

            if (!isItemOnServer.length) {
              await axios.post(
                "https://64020cd7ab6b7399d0b2a6df.mockapi.io/cart",
                obj
              );
            } else {
              const id = isItemOnServer[0].id;
              dataContext.deleteItem(id);
            }

            await axios
              .get("https://64020cd7ab6b7399d0b2a6df.mockapi.io/cart")
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

export default FavoritesPage;
