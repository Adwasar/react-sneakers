import React from 'react';
import styles from './OrderedCard.module.scss';

function OrderedCard(props) {
  return (
    <div className={styles.card}>
      <img width={133} height={112} src={props.image} alt="sneakers" />
      <h5>{props.title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{props.price} $</b>
        </div>
      </div>
    </div>
  );
}

export default OrderedCard;