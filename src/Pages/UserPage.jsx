import React from 'react';
import DataContext from '../context';

import OrderedCard from '../components/OrderedCard';

function UserPage() {
  const dataContext = React.useContext(DataContext);

  return (
    <>
      <h1 style={{ height: 47.5 }} className="mb-40">
        Мои покупки:
      </h1>
      {dataContext.orders?.map((el, i) => {
        return (
          <div key={i}>
            <div className="d-flex align-center">
              <h3>Заказ номер {el.orderNumber}</h3>
              <p className="opacity-5 ml-50">
                {el.currentDate} {el.currentTime}
              </p>
            </div>
            <div className="d-flex mb-20">
              {el.cards?.map((el, i) => {
                return (
                  <OrderedCard
                    key={i}
                    title={el.title}
                    image={el.image}
                    price={el.price}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default UserPage;
