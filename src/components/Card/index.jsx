import React from "react";
import styles from "./Card.module.scss";

function Card(props) {
  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
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
          onClick={props.onClickPlus}
          src={
            props.cartItems.find(
              (el) => el.image === props.item.image && el.title === props.item.title
            )
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
