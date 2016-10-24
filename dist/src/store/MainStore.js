import { autorun, observable, action, computed } from 'mobx'

import SingleProduct from './Single';
import localProduct from './localProduct';

const rewriteLocalStorage = function(key, item) {
  let localStorageItem = window.localStorage.getItem(key);
  if(localStorageItem) {
    window.localStorage.setItem(key, JSON.stringify(item));
  }
}

class MainStore {
  @observable isCartOpen = false
  @observable cart = []
  @observable cartTotalNum = 0;
  @observable products = null
  @observable opts = {
    choosenProduct: null
  }
  @observable productOpts = {
    price: 0,
    custom: true,
    grades: [],
    mill: [],
    extra: [],
    vol: [250],
    choosenVol: 250,
    choosenExtra: [],
    isVolumeActive: false
  }

  @observable step = 0
  @observable isVolumeActive = false
  @observable catCheck = null
  @observable singleGrade = null
  @observable singleTotal = 0

  @observable pages = [
    {
      title: 'Интернет-магазин',
      btn: 'Продолжить'
    }, 
    {
      title: 'Интернет-магазин1',
      btn: 'Добавить в корзину'
    },
    {
      title: 'Корзина',
      btn: 'Оформить заказ'
    },
    {
      title: 'Контактная информация',
      btn: 'Оформить'
    }
  ]

  constructor() {
    let cart = window.localStorage.getItem('cart');
    if(cart) {
      this.cart = JSON.parse(cart)
    }
    if(this.cart.length !== 0) {
      this.cartTotal()
    }
  }

  // @computed get filteredProduct() {
  //   return this.products.filter( product => !this.opts.choosenProduct || product.id === this.opts.choosenProduct)
  // }

  recalcSingleTotal() {
    const product = this.productOpts
    let extraTotal = 0;

    if(product.choosenExtra.length !== 0) {
      product.choosenExtra.map(e => {
        extraTotal += e.price * e.qty
      })
    }


    if(!product.customisable && (product.singleGrade && product.singleGrade.length !== 0)) {
      product.price = product.singleGrade.price * (+product.choosenVol)/100 + extraTotal
    }
    else if(!product.customisable && !product.singleGrade) {
      product.price = 0
    }
    else if (product.customisable && product.allPerc !== 0) {
      product.price = 0
      const choosenGrades = product.grades.filter( grade => grade.perc !==0 );

      choosenGrades.map(grade => {
        product.price += grade.price/100 * grade.perc * (+product.choosenVol)/100
      })
      product.price += extraTotal
    }
    else if (product.customisable && product.allPerc === 0) {
      product.price = 0
    }
  }

  @computed get singleTotalCalc() {
    return this.singleTotal * this.productOpts.choosenVol
  }

  set productOptions(product) {
    this.productOpts = product
  }

  get productOptions() {
    return this.productOpts
  }

  setCurrentProduct(id) {
    let product = this.products.filter(pr => pr.id === +id)[0]
    this.productOptions = new SingleProduct(product);
    this.singleTotal = 0;
  }


  // getProduct(id, call) {

  //   this.categories.map(cat => {
  //     if(cat.id == id) {
  //       call(cat)
  //       return false
  //     }
  //   });
  // }

  // getGrade(index, call) {
  //   call(this.product.grades[index])
  // }

  // resetGradesPers() {
  //   this.product.grades.forEach(gr => {
  //     gr.perc = 0
  //   });
  // }

  // get currentStep () {
  //   return this.step
  // }

  @action nextStep = () => {
    if( this.step < this.pages.length ) {

      if(this.step === 0 && !this.productOptions.id) {
        swal({   title: 'Пожалуйста, выберите товар',    type: "error",   timer: 1300,   showConfirmButton: false });
        return false;
      }else if(this.step === 1 && !this.productOptions.customisable && !this.productOptions.singleGrade) {
        swal({   title: 'Пожалуйста, выберите сорт',    type: "error",   timer: 1300,   showConfirmButton: false });
        return false;
      }else if(this.step === 1 && this.productOptions.customisable && this.productOptions.allPerc < 100) {
        swal({   title: 'Кастомизация должна быть выполнена на 100%',    type: "error",   timer: 1300,   showConfirmButton: false });
        return false;
      }else if(this.step === 1 &&
              (this.productOptions.customisable && this.productOptions.allPerc === 100) ||
              (!this.productOptions.customisable && this.productOptions.singleGrade)){
        this.addToCart(this.productOptions)
      }
      if(this.step === 2 && this.cart.length === 0) {
        swal({   title: 'Ваша корзина пуста',    type: "error",   timer: 1300,   showConfirmButton: false });
        return false;
      }
      this.step++;
    }
  }

  @action prevStep = () => {
    if(this.step === 2) {
      this.step = this.step - 2
      this.catCheck = null
      return false;
    }
    this.step--
  }

  @action changeStep = (step) => {
    this.step = step
  }

  @action activateSideCart = () => {
    this.isCartOpen = true
  }

  @action closeSideCart = () => {
    this.isCartOpen = false
  }

  @action addToCart = (product) => {
    if(this.step === 1) {

      let cart = window.localStorage.getItem('cart');
      if(!cart) {
        window.localStorage.setItem('cart', JSON.stringify([new localProduct(product)]));
        this.cart.push(new localProduct(product))
      }else {
        cart = JSON.parse(cart);
        cart.push(new localProduct(product))
        this.cart.push(new localProduct(product))
        window.localStorage.setItem('cart', JSON.stringify(cart));
      }
      this.cartTotal()
    }
  }

  @action removeFromCart = (cart, product) => {
    cart.map((item, index) => {
      if(item == product) {
        cart.splice(index, 1);
        rewriteLocalStorage('cart', cart)
        this.cartTotal()
      }
    })
  }

  @action cartTotal = () => {
    let total = 0;
    this.cart.map(item => {
      total += item.price * item.qty;
    })
    this.cartTotalNum = total
    return total
  }

  @action onMoreQty = (product) => {
    this.cart.map((item, index) => {
      if(item.cartId == product.cartId) {
        if(item.qty < 10) {
          item.qty += 1
          rewriteLocalStorage('cart', this.cart)
          this.cartTotal()
        }
      }
    })
  }

  @action onLessQty = (product) => {
    this.cart.map((item, index) => {
      if(item.cartId == product.cartId) {
        if(item.qty > 1) {
          item.qty -= 1
          rewriteLocalStorage('cart', this.cart)
          this.cartTotal()
        }
      }
    })
  }

}

let store = window.store = new MainStore

export default store

autorun(() => {

})