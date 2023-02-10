import styles from './Card.module.scss'

console.log(styles);

function Card(props) {
  const onClickBtn = () => {
    alert(props.title);
  }

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
          <b>{props.price} руб.</b>
        </div>
        <button onClick={onClickBtn} className="button">
          <img width={11} height={11} src='img/plus.svg' alt="#"></img>
        </button>
      </div>
    </div>
  );
}

export default Card;