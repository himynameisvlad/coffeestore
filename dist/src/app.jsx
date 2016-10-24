import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { observer } from 'mobx-react'
import store from './store/MainStore'
//components
import SideCart from './components/Cart/sideCart.jsx';
import { Header } from './components/Header/header'
import { Footer } from './components/Footer/footer.jsx'
import { Categories } from './components/cats/Categories'
import { Single } from './components/Choose/Single.jsx'
import Cart from './components/Cart/Cart.jsx';
import {Form} from './components/Form/Form.jsx';

//main app methods
import nextStep from './modules/nextStep'
import prevStep from './modules/prevStep'

//pages
@observer
export default class App extends React.Component {
  constructor() {
    super();
    this.$body = $('body')
    this.state = {
      body: $('body'),
      isStepChainging: false,
      step: 0,
      pages: store.pages,
      currentPage: store.pages[0],
      title: store.title
    }

    $(document).on('click', (e) => {
      if(this.props.store.productOptions.isVolumeActive && (!$(e.currentTarget).hasClass('product__vol-window'))) {
        this.props.store.productOptions.dropVolumes()
      }
    })

  }

  closeStore() {
    this.state.body.removeClass('store-active')
  }

  nextStep(e) {
    nextStep.call(this, e)
  }

  prevStep(e) {
    prevStep.call(this, e)
  }

  render() {
    this.state.step = this.props.store.step;
    return (
      <div className="main">
        <div id="desc-product__modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" className="modal fade">
          <div role="document" className="modal-dialog modal-sm">
            <div className="modal-content"></div>
          </div>
        </div>
        <SideCart 
            isCartOpen={store.isCartOpen}
            onCartClose={store.closeSideCart}
            changeStep={store.changeStep}
            cart={store.cart}
            cartTotal={store.cartTotalNum}
            onDeleteFromCart={store.removeFromCart} />
        <Header
          pages={store.pages}
          step={store.step}
          productTitle={store.productOptions.title}
          onCartClick={store.activateSideCart}
          close={this.closeStore.bind(this)}/>

        <div className="store__body">
          <Categories 
              products={store.products} 
              step={store.step}
              currentProduct={store.productOptions}
              setCurrentProduct={store.setCurrentProduct.bind(store)} />
          <Single 
              step={store.step}
              currentProduct={store.productOptions}
              recalcSingleTotal={store.recalcSingleTotal.bind(store)} />
          <Cart
              step={store.step}
              cart={store.cart}
              changeStep={store.changeStep}
              onMoreQty={store.onMoreQty}
              onLessQty={store.onLessQty}
              onDeleteFromCart={store.removeFromCart} />
          <Form 
              step={store.step} />
        </div>

        <Footer 
          onNextStep={store.nextStep.bind(store)}
          onPrevStep={store.prevStep.bind(store)}
          step={this.state.step}
          cartTotal={store.cartTotalNum}
          cart={store.cart}
          currentProduct={store.productOptions}
          close={this.closeStore.bind(this)}
          pages={store.pages} />
      </div>
    )
  }
}