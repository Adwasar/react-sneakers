import React, { useEffect } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import axios from 'axios';

import CartItem from './CartItem';
import CartInfo from './CartInfo';
import DataContext from '../context';

function Drawer(props) {
  const [isLoading, setIsLoading] = React.useState(false);

  const dataContext = React.useContext(DataContext);

  useEffect(() => console.log(isLoading), [isLoading]);

  const makeAnOrder = async () => {
    dataContext.setIsOrdered(true);
    setIsLoading(true);

    const cartItems = [...dataContext.cartItems];

    for (const el of cartItems) {
      await axios.delete(
        `https://64020cd7ab6b7399d0b2a6df.mockapi.io/cart/${el.id}`
      );
    }

    setIsLoading(false);

    dataContext.setCartItems([]);
  };

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
          dataContext.isOrdered ? (
            <CartInfo
              img={'/img/is-ordered-cart.svg'}
              title={<span style={{color: '#87C20A'}}>Заказ оформлен!</span>}
              description={
                'Ваш заказ скоро будет передан курьерской доставке'
              }
            />
          ) : (
            <CartInfo
              img={'/img/empty-cart.svg'}
              title={'Корзина пуста'}
              description={
                'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'
              }
            />
          )
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
              <button
                disabled={isLoading}
                onClick={makeAnOrder}
                className="greenButton"
              >
                {isLoading ? (
                  <PulseLoader
                    color="#ffffff"
                    margin={8}
                    size={8}
                    speedMultiplier={1}
                  />
                ) : (
                  <>
                    Оформить заказ
                    <img
                      className="forwardArrow"
                      src="img/arrow-forward.svg"
                      alt="arrow"
                    />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Drawer;
