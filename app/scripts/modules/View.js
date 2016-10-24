import PubSub from '../helpers/PubSub'
import {displayCatList} from './views/cats'
import {displayGrades, displayVolumes} from './views/product'

class View extends PubSub {
	constructor(){
		super()

		this.body = $('body')

		//pages
		this.catsPage = $('.store__list')
		this.prodPage = $('.store__product')

		this.catsContainer = $('.cats__container')
		this.nextBtn = $('.store-footer__btn--next')
		this.prevBtn = $('.store-footer__btn--back')

		//product
		this.types = $('.product__type-item')
		this.oneType = $('.product__type-item--one')
		this.sevType = $('.product__type-item--sev')
		this.gradeContainer = $('.product__prop-list');
		this.millContainer = $('.product__mill')
		this.total = $('.store-footer__total')
		this.vol = $('.product__vol-window')
		this.volContainer = $('.product__vol-list')
		this.prodModal = $('#desc-product__modal')
		this.prodModalTrigger = $('.product__descr').find('a')

		$(document).on('click', '.cat', function(e) {
			const $this = $(this)
			const checkedCat = $('.cat.checked') 

			if($this.hasClass('cat') && $this !== checkedCat) {
				checkedCat.removeClass('checked')
				$this.addClass('checked')
			}else if(!$this.hasClass('cat') && $this !== checkedCat){
				checkedCat.removeClass('checked')
				$this.closest('.cat').addClass('checked')
			}
			
		});

		//types
		this.types.on('click', e => {
			e.preventDefault()
			let $this = $(e.currentTarget)
			if(!$this.hasClass('active')){
				this.types.removeClass('active')
				$this.addClass('active')
				this.trigger('typeChanged', +$this.attr('data-type'))
			}
		})

		//volume
		this.vol.on('click', e=> {
			e.preventDefault()
			let $this = $(e.currentTarget)

			if(!$this.hasClass('active')){
				$this.addClass('active')
			}else {
				$this.removeClass('active')
			}
		})

		this.vol.on('click', '.product__vol-item', e => {
			e.preventDefault()
			let $this = $(e.currentTarget)
			let newVol = $this.text()

			this.vol.find('span').text(`${newVol} г`)
			$this.trigger('volChanged', newVol)
		})

		$(document).on('click', e => {
			if(this.vol.hasClass('active') && !$(e.target).is('.product__vol-window') && !$(e.target).is('.product__vol-window *')){
				console.log('sadf');
				this.vol.removeClass('active')
			}
		})

		//modal
		this.prodModalTrigger.on('click', e=>{
			e.preventDefault()
			this.prodModal.modal('show')
		})

		//buttons
		this.nextBtn.on('click', e => {
			e.preventDefault();
			let data = {}
			let btnPage = +$(e.currentTarget).attr('data-page')
			data.page = btnPage
			if(btnPage === 0) {
				let checkedCat = this.catsContainer.find('article.checked')
				if(checkedCat.length) {
					let catId = checkedCat.attr('data-id')
					data.catId = catId
					this.prodPage.attr('data-prod', catId)
				}
			}
			this.trigger('nextBtnClicked', data)
		})

		this.prevBtn.on('click', e=> {
			e.preventDefault()
			let btnPage = +this.nextBtn.attr('data-page')
			if(btnPage === 0) {
				this.body.removeClass('store-active')
			}else if(btnPage === 1) {
				this.hideProdPage()
				this.showCatsPage()
				this.nextBtn.attr('data-page', 0)
				this.hideTotal()
				this.changeNextBtnText('Продолжить')
			}
		});

	}

	//cats page
	hideCatsPage() {
		this.catsPage.addClass('hidden')
	}

	showCatsPage() {
		this.catsPage.removeClass('hidden')
	}

	//prod
	loadProdPage(data) {
		if(!( data.id === +this.prodPage.data('prod')) ) {
			//types
			if(data.custom) {
				this.types.removeClass('active')
				this.sevType.removeClass('hidden').addClass('active')
			}else {
				this.types.removeClass('active')
				this.sevType.addClass('hidden')
				this.oneType.addClass('active')
			}
			//grades
			this.gradeContainer.html(displayGrades(data))
			//volume
			this.volContainer.html(displayVolumes(data.vol))
			this.vol.find('span').text(`${data.vol[0]} г`)
			//mill
			if(data.mill && data.mill.length) {
				this.millContainer.removeClass('hidden')
			}else{
				this.millContainer.addClass('hidden')
			}
		}
		this.showProdPage()
	}


	showProdPage() {
		this.prodPage.removeClass('hidden')
	}

	hideProdPage() {
		this.prodPage.addClass('hidden')
	}

	//types
	setOneType() {
		$('.prop-item').removeClass('prop-item--custom')
	}
	setMoreTypes() {
		$('.prop-item').addClass('prop-item--custom')
	}

	showAutoAlert(title) {
		swal({   title,    type: "error",   timer: 1300,   showConfirmButton: false });
	}

	//next btn
	changeNextBtnText(text){
		this.nextBtn.text(text)
	}

	setPageToBtn(page) {
		this.nextBtn.attr('data-page', page)
	}

	//total
	showTotal() {
		this.total.removeClass('hidden')
	}

	hideTotal() {
		this.total.addClass('hidden')
	}


	tempCategories(data) {
		this.catsContainer.html(displayCatList(data));
	}

	showProdModal() {
		this.prodModal.modal('show')
	}

	init() {

	}
}

export default View