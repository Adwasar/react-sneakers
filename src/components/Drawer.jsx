function Drawer(props) {
  console.log(props.addedItems.length);
  
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

        {props.addedItems.length === 0 && 
          <div className="d-flex align-center justify-center flex-column">
            <img src="/img/empty-cart.svg" alt="empty cart" />
            <h2>Корзина пуста</h2>
            <p className="opacity-6">Добавьте хотя бы одну пару кроссовок</p>
          </div>
        }

        <div className="items">
          {props.addedItems.map((el, i) => {
            return (
              <div key={i} className="cartItem d-flex align-center mb-20">
                <div
                  className="cartItemImg"
                  style={{ backgroundImage: `url(${el.image})` }}
                ></div>
                <div className="mr-20 flex">
                  <p className="mb-5">{el.title}</p>
                  <b>{el.price} $</b>
                </div>
                <img
                  onClick={() => {
                    props.removeItem(el);
                  }}
                  className="removeBtn"
                  src="/img/btn-remove.svg"
                  alt="Remove"
                />
              </div>
            );
          })}
        </div>

        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>538 $</b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>24 $</b>
            </li>
          </ul>
          <button className="greenButton">
            Оформить заказ <img src="img/arrow.svg" alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
