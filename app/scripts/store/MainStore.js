import { autorun, observable, action, computed } from 'mobx'
import {cats} from './data'

class MainStore {
  @observable step = 0
  @observable product = {title: '', descr: '', mono: false, mixes: [], extra: []}
  @observable mixes = []
  @observable pages = [
    {
      title: 'Интернет-магазин',

    }, 
    {
      title: 'Интернет-магазин1'
    },
    {
      title: null
    }
  ]

  @observable categories = cats

  nextStep() {
    if( this.step < this.categories.length ) {
      this.step++
      if( this.product.mono && this.step === 1) this.step++
    }
  }

  prevStep() {
    this.step--
    if( this.product.mono && this.step === 1 ) this.step--
  }

  @action changeCatCheck = (cat, checked) => {
    this.categories[cat].checked = checked
  }

  @computed get getMixes() {
    return this.product.mixes.map(mix => mix)
  }

  @computed get getExtra() {
    return this.product.extra.map(mix => mix)
  }

}

let store = window.store = new MainStore

export default store

autorun(() => {

})