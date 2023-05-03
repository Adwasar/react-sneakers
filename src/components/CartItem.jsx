/* eslint-disable multiline-ternary */
import React, { useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import DataContext from '../context';

function CartItem(props) {
  const [isLoading, setIsLoading] = React.useState(false);

  const dataContext = React.useContext(DataContext);

  const handleOnDelete = async () => {
    setIsLoading(true);
    await dataContext.deleteCartItem(props.card.id);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [dataContext.cartItems]);

  return (
    <div className="cartItem d-flex align-center mb-20">
      <div
        className="cartItemImg"
        style={{ backgroundImage: `url(${props.card.image})` }}
      ></div>
      <div className="mr-20 flex">
        <p className="mb-5">{props.card.title}</p>
        <b>{props.card.price} $</b>
      </div>
      {isLoading ? (
        <ClipLoader color="#3CC755" size={32} />
      ) : (
        <img
          onClick={handleOnDelete}
          className="removeBtn"
          src="/img/btn-remove.svg"
          alt="Remove"
        />
      )}
    </div>
  );
}

export default CartItem;
