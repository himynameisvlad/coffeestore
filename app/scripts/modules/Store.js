import PubSub from '../helpers/PubSub'
import {cats, product} from './data'

class Store extends PubSub {
	constructor(){
		super()
		this.cats = null
		this.prod = null
		this._cPage = 0
		this._pPage = null

		this.pages = [
			{
				title: 'Интернет магазин',
				cls: '.store__list',
				btn: 'Продолжить'
			},
			{
				title: '',
				btn: 'Добавить в корзину',
				cls: '.store__product',
			},
			{
				title: 'Корзина',
				cls: '.store__cart',
				btn: 'Оформить заказ'
			},
			{
				title: 'Контактная информация',
				cls: '.store__contacts',
				btn: 'Оформить'
			}
		]
	}

	get prevPage() {
		return this._pPage
	}

	get curPage() {
		return this._cPage
	}

	set prevPage(val) {
		this._pPage = val
	}

	set curPage(val) {
		this._cPage = val
	}


	getCategories() {
		if(this.cats) return this.cats
		this.cats = JSON.parse(cats)
		return this.cats
	}

	getProduct(id) {
		this.prod = JSON.parse(product)[id]
		return this.prod
	}

	init() {

	}
}

export default Store