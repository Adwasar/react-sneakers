import React from 'react';
import DataContext from '../context';

import OrderedCard from '../components/OrderedCard';
import PageInfo from '../components/PageInfo';

function UserPage() {
  const dataContext = React.useContext(DataContext);

  return (
    <>
      <h1 style={{ height: 47.5 }} className="mb-40">
        Мои покупки:
      </h1>
      {dataContext.orders ? (
        dataContext.orders?.slice().reverse().map((order, i) => {
          return (
            <div key={i} className="order">
              <div className="d-flex align-center justify-between">
                <h3>Заказ №{order.orderNumber}</h3>
                <p className="opacity-5">
                  {order.currentDate} {order.currentTime}
                </p>
              </div>
              <div className="d-flex flex-wrap">
                {order.cards?.map((card, i) => {
                  return (
                    <OrderedCard
                      key={i}
                      title={card.title}
                      image={card.image}
                      price={card.price}
                      total={card.total}
                    />
                  );
                })}
              </div>
              <strong>Сума заказа: {order.total} $</strong>
            </div>
          );
        })
      ) : (
        <PageInfo
          img={'/img/sad-2.svg'}
          title={'Заказов пока нет :('}
          description={'Для оформления заказа добавьте в корзину интересующий Вас товар и нажмите "Оформить заказ"'}
        />
      )}
    </>
  );
}

export default UserPage;
