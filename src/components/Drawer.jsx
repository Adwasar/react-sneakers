import React from 'react';

import CartItem from './CartItem';
import DataContext from '../context';

function Drawer(props) {
  const dataContext = React.useContext(DataContext);

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30 ">
          Корзина
          <img
            onClick={props.onClickClose}
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="Close"
          />
        </h2>

        {dataContext.cartItems.length === 0 ? (
          <div className="cartTotalBlock d-flex align-center justify-center flex-column flex">
            <img src="/img/empty-cart.svg" alt="empty cart" />
            <h2>Корзина пуста</h2>
            <p className="opacity-6 pb-40">
              Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ
            </p>
            <button onClick={props.onClickClose} className="greenButton">
              <img className="backArrow" src="img/arrow-back.svg" alt="arrow" />
              Вернуться назад
            </button>
          </div>
        ) : (
          <>
            <div className="items">
              {dataContext.cartItems.map((card, i) => {
                return <CartItem key={i} card={card} />;
              })}
            </div>

            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Количество:</span>
                  <div></div>
                  <b>{dataContext.cartItems.length} шт.</b>
                </li>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{dataContext.cartTotal} $</b>
                </li>
              </ul>
              <button className="greenButton">
                Оформить заказ{' '}
                <img
                  className="forwardArrow"
                  src="img/arrow-forward.svg"
                  alt="arrow"
                />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Drawer;
