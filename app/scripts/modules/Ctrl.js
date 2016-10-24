import PubSub from '../helpers/PubSub'
import Store from './Store'
import View from './View'

class Ctrl {
	constructor(){
		this.store = new Store()
		this.view = new View()
	}

	typeCtrl() {
		this.view.on('typeChanged', (type) => {

			if(type === 1) {
				this.view.setOneType()
			}else {
				this.view.setMoreTypes()
			}
		})
	}

	nextBtnCtrl() {
		this.view.on('nextBtnClicked', (data) => {

			if(data.page === 0) {
				if(data.catId) {
					this.view.hideCatsPage()
					this.view.loadProdPage(this.store.getProduct(data.catId))
					this.view.changeNextBtnText('Добавить в корзину')
					this.view.showTotal()
					this.view.setPageToBtn(++data.page)
				}else {
					this.view.showAutoAlert('Пожалуйста, выберите категорию')
				}
			}
			let curPage = this.store.curPage
			this.store.prevPage = curPage
			this.store.curPage = ++curPage
		})
	}

	init() {
		//get initial cats
		this.nextBtnCtrl();
		this.typeCtrl()
		this.view.tempCategories(this.store.getCategories())
	}

}

export default Ctrl