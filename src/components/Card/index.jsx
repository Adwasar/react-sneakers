import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import DataContext from '../../context';
import styles from './Card.module.scss';

function Card(props) {
  const [isDownloadingToCart, setIsDownloadingToCart] = React.useState(false);

  const dataContext = React.useContext(DataContext);

  const handleOnPlus = async () => {
    setIsDownloadingToCart(true);

    await dataContext.addCartItem(props.item);

    setIsDownloadingToCart(false);
  };

  const addToFavorite = () => {
    if (
      dataContext.favoriteItems.some(
        (el) => el.title === props.item.title && el.image === props.item.image
      )
    ) {
      dataContext.setFavoriteItems((prev) =>
        prev.filter(
          (el) => el.title !== props.item.title || el.image !== props.item.image
        )
      );
    } else {
      dataContext.setFavoriteItems((prev) => [...prev, props.item]);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          onClick={addToFavorite}
          src={
            dataContext.favoriteItems.some(
              (el) =>
                el.title === props.item.title && el.image === props.item.image
            )
              ? '/img/heart-like.svg'
              : '/img/heart-unliked.svg'
          }
          alt="#"
        />
      </div>
      <img width={133} height={112} src={props.image} alt="sneakers" />
      <h5>{props.title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{props.price} $</b>
        </div>
        {isDownloadingToCart ? (
          <ClipLoader color="#3CC755" size={32} />
        ) : (
          <img
            className={styles.plus}
            onClick={handleOnPlus}
            src={
              dataContext.cartItems.find(
                (el) =>
                  el.image === props.item.image && el.title === props.item.title
              )
                ? '/img/btn-checked.svg'
                : '/img/btn-plus.svg'
            }
            alt="#"
          ></img>
        )}
      </div>
    </div>
  );
}

export default Card;
