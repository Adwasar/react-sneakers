function Header(props) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="headerLeft d-flex align-center">
        <img className="logo" width={40} height={40} src="img/logo.png" alt="logo" />
        <div className="headerInfo">
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className="headerRight d-flex">
        <li onClick={props.onClickCart} className="d-flex align-center mr-25 cu-p">
          <img src="img/cart.svg" width={20} height={20} alt="Корзина" />
          <span className="ml-5">1205 $</span>
        </li>
        <li className="d-flex align-center mr-25 cu-p">
          <img src="img/heart.svg" width={20} height={20} alt="Закладки" />
        </li>
        <li className="d-flex align-center cu-p">
          <img src="img/user.svg" width={22} height={22} alt="Пользователь" />
        </li>
      </ul>
    </header>
  )
}

export default Header;