import React from 'react';

import DataContext from '../context';

function CartInfo(props) {
  const dataContext = React.useContext(DataContext);

  return (
    <div className="cartTotalBlock d-flex align-center justify-center flex-column flex">
      <img src={props.img} className="pb-30" alt="cart status" />
      <h2>{props.title}</h2>
      <p className="opacity-6 pb-40">{props.description}</p>
      <button onClick={dataContext.closeCart} className="greenButton">
        <img className="backArrow" src="img/arrow-back.svg" alt="arrow" />
        Вернуться назад
      </button>
    </div>
  );
}

export default CartInfo;
