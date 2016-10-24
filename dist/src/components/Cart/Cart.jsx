import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'

import CartItem from './CartItem.jsx'

@observer
export default class Cart extends React.Component {
    constructor() {
        super();
    }

    onEmptyLinkClick(e) {
        e.preventDefault();
        this.props.changeStep(0)
    }


    render() {
        let renderedCart = null;
        const cartClass = classNames('store__cart', {hidden: this.props.step !== 2});
        let cartContent = <div className="cart__empty">Корзина пуста <a href="" onClick={this.onEmptyLinkClick.bind(this)}>На страницу товаров</a></div>

        if(this.props.cart.length !== 0) {
            cartContent = this.props.cart.map((product, index) => {
                return (<CartItem cart={this.props.cart} onDeleteFromCart={this.props.onDeleteFromCart} key={index} product={product} index={index} onMoreQty={this.props.onMoreQty} onLessQty={this.props.onLessQty}></CartItem>)
            })
        }

        if(this.props.step === 2) {
            renderedCart = (
                <div className={cartClass} >
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-offset-1 col-sm-10">
                                {cartContent}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return renderedCart
    }
}