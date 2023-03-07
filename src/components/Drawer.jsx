function Drawer(props = []) {

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30 ">
          Корзина
          <img onClick={props.onClickClose} className="cu-p" src="/img/btn-remove.svg" alt="Close" />
        </h2>

        <div className="items">
          {props.cartItems.map((el, i) => {
            return (
              <div className="cartItem d-flex align-center mb-20">
                <div className="cartItemImg"
                  style={{ backgroundImage: `url(${el.image})` }}></div>
                <div className="mr-20 flex">
                  <p className="mb-5">{el.title}</p>
                  <b>{el.price} руб.</b>
                </div>
                <img
                  onClick={() => {
                    // console.log(el)
                    props.removeItem(el);
                  }}
                className="removeBtn"
                src="/img/btn-remove.svg"
                alt="Remove"
                />
              </div>
            )
          })}
        </div>

        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>21 498 руб.</b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>1074 руб.</b>
            </li>
          </ul>
          <button className="greenButton">
            Оформить заказ <img src="img/arrow.svg" alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Drawer;