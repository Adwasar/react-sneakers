import React from "react";
import styles from "./Card.module.scss";

function Card(props) {
  const onClickPlus = () => {
    if (!props.addedItems.includes(props.item)) {
      props.updateItems();
    } else {
      props.removeItem();
    }
  };

  return (
    <div className={styles.card}>
      <div onClick={props.onFavorite} className={styles.favorite}>
        <img src="/img/heart-unliked.svg" alt="#" />
      </div>
      <img width={133} height={112} src={props.image} alt="sneakers" />
      <h5>{props.title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{props.price} $</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={
            props.addedItems.includes(props.item)
              ? "/img/btn-checked.svg"
              : "/img/btn-plus.svg"
          }
          alt="#"
        ></img>
      </div>
    </div>
  );
}

export default Card;
