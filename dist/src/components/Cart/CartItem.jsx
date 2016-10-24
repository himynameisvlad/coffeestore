import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'

@observer
export default class CartItem extends React.Component {
    constructor() {
        super();
    }

    onMoreQty(product) {
        this.props.onMoreQty(product)
    }

    onLessQty(product) {
        this.props.onLessQty(product)
    }

    render() {

        let product = this.props.product;
        let grades = null;
        let extra = <div>Без добавок</div>;
        let mill = null;
        let price = null;
        let moreQtyBtnClass = classNames('cart-item__qty cart-item__qty-more', {hidden: product.qty == 10})
        let lessQtyBtnClass = classNames('cart-item__qty cart-item__qty-less', {hidden: product.qty == 1})

        if(!product.customisable || product.customisable && product.grades.length == 1) {
            grades = <div><h6>Один сорт</h6><div>{product.grades[0].title}</div></div>
        }else{
            grades = <div>
                        <h6>Смесь</h6>
                        {
                            product.grades.map((grade,index) => {
                                return <div key={index}>{grade.title}<span className="cart__perc">{grade.perc} %</span></div>
                            })
                        }
                    </div>
        }

        if(product.extra && product.extra.length !== 0) {
            extra = product.extra.map((ex, index) => {
                return <div key={index}>{ex.title}</div>
            })
        }

        if(product.mill) {
            mill = <div className="cart__mill"><h6>Помол</h6><div>{product.mill}</div></div>
        }

        if(product.price) {
            price = product.price
        }

        return (
            <div className="cart__item">
                <div className="row">
                    <div className="cart__title col-sm-2"><img src={product.img} width="20" alt=""/><h5>{product.title}</h5></div>
                    <div className="cart__type col-sm-3">
                        {grades}
                        <div className="cart__extra">
                            <h6>Добавки</h6>
                            {extra}
                        </div>
                    </div>

                    <div className="cart__vol col-sm-2 col-sm-offset-1">
                        <h6>Масса</h6>
                        {product.choosenVol} г
                        {mill}
                    </div>
                    <div className="cart__price col-sm-4">
                        <h4>{price} р 
                            <span>
                                <button onClick={this.onMoreQty.bind(this, product)} className={moreQtyBtnClass}></button>
                                    x {product.qty}
                                <button onClick={this.onLessQty.bind(this, product)} className={lessQtyBtnClass}></button>
                            </span>
                        </h4>
                    </div>
                    <a href="#" onClick={this.props.onDeleteFromCart.bind(null, this.props.cart, product)} className="cart__delete">Удалить</a>
                </div>
            </div>
        );
    }
}