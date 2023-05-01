import React from "react";
import { Link } from "react-router-dom";
import DataContext from "../context";

function Header(props) {
  const dataContext = React.useContext(DataContext);
  
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div onClick={() => dataContext.setFavoriteItems(dataContext.likedItems)} className="headerLeft d-flex align-center cu-p">
          <img
            className="logo"
            width={40}
            height={40}
            src="img/logo.png"
            alt="logo"
          />
          <div className="headerInfo">
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <nav>
        <ul className="headerRight d-flex">
          <li
            onClick={props.onClickCart}
            className="d-flex align-center mr-25 cu-p"
          >
            <img src="img/cart.svg" width={20} height={20} alt="Корзина" />
            <span>{dataContext.cartTotal} $</span>
          </li>
          <Link to="/favorites">
            <li onClick={() => dataContext.setFavoriteItems(dataContext.likedItems)} className="d-flex align-center mr-25 cu-p">
              <img src="img/heart.svg" width={20} height={20} alt="Закладки" />
            </li>
          </Link>
          <li className="d-flex align-center cu-p">
            <img src="img/user.svg" width={22} height={22} alt="Пользователь" />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
