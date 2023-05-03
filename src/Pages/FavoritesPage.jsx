import React from 'react';
import DataContext from '../context';

import Card from '../components/Card';
import CardLoader from '../components/CardLoader';

function FavoritesPage() {
  const dataContext = React.useContext(DataContext);

  return (
    <>
      <h1 style={{ height: 47.5 }} className="mb-40">
        Избранное:
      </h1>
      <div className="d-flex flex-wrap">
        {dataContext.favoriteStorageItems.map((obj, i) => {
          return (
            <Card
              key={i}
              item={obj}
              title={obj.title}
              price={obj.price}
              image={obj.image}
            />
          );
        })}
      </div>
      <CardLoader />
    </>
  );
}

export default FavoritesPage;
