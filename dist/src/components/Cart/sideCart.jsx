import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'

@observer
export default class SideCart extends React.Component {
    constructor() {
        super();
    }

    closeCart(e) {
        e.preventDefault();
        const $this = $(e.target);
        if($this.is('.store__side-cart')) {
            this.props.onCartClose();
        }
    }
    toCartPage() {
        this.props.onCartClose();
        this.props.changeStep(2);
    }
    //<span className="side-cart__qty"></span>
    render() {
        let sideCartContent = null;
        const sideCartClass = classNames('store__side-cart side-cart', {active: this.props.isCartOpen});
        let cartList = <li className="side-cart__item">Корзина пуста</li>;
        let cartBtns = null;
        let cartTotal = null;

        if(this.props.isCartOpen) {
            if(this.props.cart.length !== 0){
                cartList = this.props.cart.map((item, index) => {
                    return (
                        <li className="side-cart__item" key={index}>
                            <span className="side-cart__qty">{item.qty}x</span>
                            {item.title}
                            <span className="side-cart__price">{item.price} р</span>
                            <a href="#" className="side-cart__remove" onClick={this.props.onDeleteFromCart.bind(null, this.props.cart, item)}></a>
                        </li>
                    )
                });
                cartBtns = (<div className="side-cart__btns">
                                <a href="#" className="side-cart__checkout">Оформить заказ</a>
                                <div className="side-cart__cart"><a href="" className="side-cart__cart-link" onClick={this.toCartPage.bind(this)}>На страницу корзины</a>
                                </div>
                            </div>)
                cartTotal = <div className="side-cart__total"><p className="clearfix">Итог <span>{this.props.cartTotal} р</span></p></div>;
            }
            sideCartContent = (
                    <div>
                        <h3 className="side-cart__title">Корзина</h3>
                        <ul className="side-cart__list">
                            {cartList}
                        </ul>
                        {cartTotal}
                        {cartBtns}
                    </div>
                )
        }
        return(
            <div onClick={this.closeCart.bind(this)} className={sideCartClass}>
                <div className="side-cart__content">
                    {sideCartContent}
                </div>
            </div>
        );
    }
}