(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PubSub = (function () {
	function PubSub() {
		_classCallCheck(this, PubSub);
	}

	_createClass(PubSub, [{
		key: "on",
		value: function on(eventName, callback) {
			this.events = this.events || {};

			this.events[eventName] = this.events[eventName] || [];
			this.events[eventName].push(callback);
			return this;
		}
	}, {
		key: "trigger",
		value: function trigger(eventName, data) {
			if (this.events && this.events[eventName]) {
				this.events[eventName].forEach(function (i) {
					i(data);
				});
			}
		}
	}]);

	return PubSub;
})();

exports["default"] = PubSub;
module.exports = exports["default"];

},{}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _modulesCtrl = require('./modules/Ctrl');

var _modulesCtrl2 = _interopRequireDefault(_modulesCtrl);

$(document).ready(function () {

	// const $body = $('body')
	// const ctrl = new Ctrl()
	// const app = $('.store__outer')
	// let appInited = false

	// ctrl.init()

	// $('#store__trigger').on('click', e => {
	// 	e.preventDefault()
	// 	$body.addClass('store-active');
	// 	appInited = true
	// 	ctrl.init();
	// 	window.history.pushState('', '', '/store');
	// })

	// $('.store-header__close').on('click', e => {
	// 	e.preventDefault()
	// 	$body.removeClass('store-active');
	// 	//window.history.back();
	// })

});

},{"./modules/Ctrl":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _helpersPubSub = require('../helpers/PubSub');

var _helpersPubSub2 = _interopRequireDefault(_helpersPubSub);

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

var _View = require('./View');

var _View2 = _interopRequireDefault(_View);

var Ctrl = (function () {
	function Ctrl() {
		_classCallCheck(this, Ctrl);

		this.store = new _Store2['default']();
		this.view = new _View2['default']();
	}

	_createClass(Ctrl, [{
		key: 'typeCtrl',
		value: function typeCtrl() {
			var _this = this;

			this.view.on('typeChanged', function (type) {

				if (type === 1) {
					_this.view.setOneType();
				} else {
					_this.view.setMoreTypes();
				}
			});
		}
	}, {
		key: 'nextBtnCtrl',
		value: function nextBtnCtrl() {
			var _this2 = this;

			this.view.on('nextBtnClicked', function (data) {

				if (data.page === 0) {
					if (data.catId) {
						_this2.view.hideCatsPage();
						_this2.view.loadProdPage(_this2.store.getProduct(data.catId));
						_this2.view.changeNextBtnText('Добавить в корзину');
						_this2.view.showTotal();
						_this2.view.setPageToBtn(++data.page);
					} else {
						_this2.view.showAutoAlert('Пожалуйста, выберите категорию');
					}
				}
				var curPage = _this2.store.curPage;
				_this2.store.prevPage = curPage;
				_this2.store.curPage = ++curPage;
			});
		}
	}, {
		key: 'init',
		value: function init() {
			//get initial cats
			this.nextBtnCtrl();
			this.typeCtrl();
			this.view.tempCategories(this.store.getCategories());
		}
	}]);

	return Ctrl;
})();

exports['default'] = Ctrl;
module.exports = exports['default'];

},{"../helpers/PubSub":1,"./Store":4,"./View":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _helpersPubSub = require('../helpers/PubSub');

var _helpersPubSub2 = _interopRequireDefault(_helpersPubSub);

var _data = require('./data');

var Store = (function (_PubSub) {
	_inherits(Store, _PubSub);

	function Store() {
		_classCallCheck(this, Store);

		_get(Object.getPrototypeOf(Store.prototype), 'constructor', this).call(this);
		this.cats = null;
		this.prod = null;
		this._cPage = 0;
		this._pPage = null;

		this.pages = [{
			title: 'Интернет магазин',
			cls: '.store__list',
			btn: 'Продолжить'
		}, {
			title: '',
			btn: 'Добавить в корзину',
			cls: '.store__product'
		}, {
			title: 'Корзина',
			cls: '.store__cart',
			btn: 'Оформить заказ'
		}, {
			title: 'Контактная информация',
			cls: '.store__contacts',
			btn: 'Оформить'
		}];
	}

	_createClass(Store, [{
		key: 'getCategories',
		value: function getCategories() {
			if (this.cats) return this.cats;
			this.cats = JSON.parse(_data.cats);
			return this.cats;
		}
	}, {
		key: 'getProduct',
		value: function getProduct(id) {
			this.prod = JSON.parse(_data.product)[id];
			return this.prod;
		}
	}, {
		key: 'init',
		value: function init() {}
	}, {
		key: 'prevPage',
		get: function get() {
			return this._pPage;
		},
		set: function set(val) {
			this._pPage = val;
		}
	}, {
		key: 'curPage',
		get: function get() {
			return this._cPage;
		},
		set: function set(val) {
			this._cPage = val;
		}
	}]);

	return Store;
})(_helpersPubSub2['default']);

exports['default'] = Store;
module.exports = exports['default'];

},{"../helpers/PubSub":1,"./data":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _helpersPubSub = require('../helpers/PubSub');

var _helpersPubSub2 = _interopRequireDefault(_helpersPubSub);

var _viewsCats = require('./views/cats');

var _viewsProduct = require('./views/product');

var View = (function (_PubSub) {
	_inherits(View, _PubSub);

	function View() {
		var _this = this;

		_classCallCheck(this, View);

		_get(Object.getPrototypeOf(View.prototype), 'constructor', this).call(this);

		this.body = $('body');

		//pages
		this.catsPage = $('.store__list');
		this.prodPage = $('.store__product');

		this.catsContainer = $('.cats__container');
		this.nextBtn = $('.store-footer__btn--next');
		this.prevBtn = $('.store-footer__btn--back');

		//product
		this.types = $('.product__type-item');
		this.oneType = $('.product__type-item--one');
		this.sevType = $('.product__type-item--sev');
		this.gradeContainer = $('.product__prop-list');
		this.millContainer = $('.product__mill');
		this.total = $('.store-footer__total');
		this.vol = $('.product__vol-window');
		this.volContainer = $('.product__vol-list');
		this.prodModal = $('#desc-product__modal');
		this.prodModalTrigger = $('.product__descr').find('a');

		$(document).on('click', '.cat', function (e) {
			var $this = $(this);
			var checkedCat = $('.cat.checked');

			if ($this.hasClass('cat') && $this !== checkedCat) {
				checkedCat.removeClass('checked');
				$this.addClass('checked');
			} else if (!$this.hasClass('cat') && $this !== checkedCat) {
				checkedCat.removeClass('checked');
				$this.closest('.cat').addClass('checked');
			}
		});

		//types
		this.types.on('click', function (e) {
			e.preventDefault();
			var $this = $(e.currentTarget);
			if (!$this.hasClass('active')) {
				_this.types.removeClass('active');
				$this.addClass('active');
				_this.trigger('typeChanged', +$this.attr('data-type'));
			}
		});

		//volume
		this.vol.on('click', function (e) {
			e.preventDefault();
			var $this = $(e.currentTarget);

			if (!$this.hasClass('active')) {
				$this.addClass('active');
			} else {
				$this.removeClass('active');
			}
		});

		this.vol.on('click', '.product__vol-item', function (e) {
			e.preventDefault();
			var $this = $(e.currentTarget);
			var newVol = $this.text();

			_this.vol.find('span').text(newVol + ' г');
			$this.trigger('volChanged', newVol);
		});

		$(document).on('click', function (e) {
			if (_this.vol.hasClass('active') && !$(e.target).is('.product__vol-window') && !$(e.target).is('.product__vol-window *')) {
				console.log('sadf');
				_this.vol.removeClass('active');
			}
		});

		//modal
		this.prodModalTrigger.on('click', function (e) {
			e.preventDefault();
			_this.prodModal.modal('show');
		});

		//buttons
		this.nextBtn.on('click', function (e) {
			e.preventDefault();
			var data = {};
			var btnPage = +$(e.currentTarget).attr('data-page');
			data.page = btnPage;
			if (btnPage === 0) {
				var checkedCat = _this.catsContainer.find('article.checked');
				if (checkedCat.length) {
					var catId = checkedCat.attr('data-id');
					data.catId = catId;
					_this.prodPage.attr('data-prod', catId);
				}
			}
			_this.trigger('nextBtnClicked', data);
		});

		this.prevBtn.on('click', function (e) {
			e.preventDefault();
			var btnPage = +_this.nextBtn.attr('data-page');
			if (btnPage === 0) {
				_this.body.removeClass('store-active');
			} else if (btnPage === 1) {
				_this.hideProdPage();
				_this.showCatsPage();
				_this.nextBtn.attr('data-page', 0);
				_this.hideTotal();
				_this.changeNextBtnText('Продолжить');
			}
		});
	}

	//cats page

	_createClass(View, [{
		key: 'hideCatsPage',
		value: function hideCatsPage() {
			this.catsPage.addClass('hidden');
		}
	}, {
		key: 'showCatsPage',
		value: function showCatsPage() {
			this.catsPage.removeClass('hidden');
		}

		//prod
	}, {
		key: 'loadProdPage',
		value: function loadProdPage(data) {
			if (!(data.id === +this.prodPage.data('prod'))) {
				//types
				if (data.custom) {
					this.types.removeClass('active');
					this.sevType.removeClass('hidden').addClass('active');
				} else {
					this.types.removeClass('active');
					this.sevType.addClass('hidden');
					this.oneType.addClass('active');
				}
				//grades
				this.gradeContainer.html((0, _viewsProduct.displayGrades)(data));
				//volume
				this.volContainer.html((0, _viewsProduct.displayVolumes)(data.vol));
				this.vol.find('span').text(data.vol[0] + ' г');
				//mill
				if (data.mill && data.mill.length) {
					this.millContainer.removeClass('hidden');
				} else {
					this.millContainer.addClass('hidden');
				}
			}
			this.showProdPage();
		}
	}, {
		key: 'showProdPage',
		value: function showProdPage() {
			this.prodPage.removeClass('hidden');
		}
	}, {
		key: 'hideProdPage',
		value: function hideProdPage() {
			this.prodPage.addClass('hidden');
		}

		//types
	}, {
		key: 'setOneType',
		value: function setOneType() {
			$('.prop-item').removeClass('prop-item--custom');
		}
	}, {
		key: 'setMoreTypes',
		value: function setMoreTypes() {
			$('.prop-item').addClass('prop-item--custom');
		}
	}, {
		key: 'showAutoAlert',
		value: function showAutoAlert(title) {
			swal({ title: title, type: "error", timer: 1300, showConfirmButton: false });
		}

		//next btn
	}, {
		key: 'changeNextBtnText',
		value: function changeNextBtnText(text) {
			this.nextBtn.text(text);
		}
	}, {
		key: 'setPageToBtn',
		value: function setPageToBtn(page) {
			this.nextBtn.attr('data-page', page);
		}

		//total
	}, {
		key: 'showTotal',
		value: function showTotal() {
			this.total.removeClass('hidden');
		}
	}, {
		key: 'hideTotal',
		value: function hideTotal() {
			this.total.addClass('hidden');
		}
	}, {
		key: 'tempCategories',
		value: function tempCategories(data) {
			this.catsContainer.html((0, _viewsCats.displayCatList)(data));
		}
	}, {
		key: 'showProdModal',
		value: function showProdModal() {
			this.prodModal.modal('show');
		}
	}, {
		key: 'init',
		value: function init() {}
	}]);

	return View;
})(_helpersPubSub2['default']);

exports['default'] = View;
module.exports = exports['default'];

},{"../helpers/PubSub":1,"./views/cats":7,"./views/product":8}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var cats = JSON.stringify({
	categories: [{
		title: 'Кофе',
		img: 'assets/images/cat1.jpg',
		desc: 'Пара слов о товаре. Пара<br> слов о товаре.',
		slug: '1',
		id: '12',
		custom: true
	}, {
		title: 'Чай',
		img: 'assets/images/cat2.jpg',
		desc: 'Пара слов о товаре. Пара<br> слов о товаре.',
		slug: '2',
		id: '123',
		custom: true
	}, {
		title: 'Печенье',
		img: 'assets/images/cat2.jpg',
		desc: 'Пара слов о товаре. Пара<br> слов о товаре.',
		slug: '3',
		id: '124',
		custom: false
	}, {
		title: 'Орехи',
		img: 'assets/images/cat2.jpg',
		desc: 'Пара слов о товаре. Пара<br> слов о товаре.',
		slug: '4',
		id: '125',
		custom: true
	}]
});

exports.cats = cats;
var product = JSON.stringify({
	12: {
		title: 'Кофе',
		fullDesc: 'фывафывафы',
		custom: true,
		mill: ['Не молоть', 'Для турки', 'Для френч'],
		vol: [250, 500, 1000],
		linkTitle: 'Как правильно выбрать кофе',
		extra: [{
			title: 'Цедра апельсина',
			price: 12
		}, {
			title: 'Какао',
			price: 15
		}],
		grades: [{
			title: 'Бразилия Сантос 1',
			id: 5645,
			price: 10
		}, {
			title: 'Бразилия Сантос 2',
			id: 56454,
			price: 10
		}]
	},
	124: {
		title: 'Печенье',
		fullDesc: 'Описание печенья',
		custom: false,
		vol: [250, 500],
		extra: [{
			title: 'Шоколад',
			price: 12
		}, {
			title: 'Какао',
			price: 15
		}],
		grades: [{
			title: 'Шоколадное',
			id: 5645546,
			price: 10
		}, {
			title: 'Другое печенье',
			id: 56454445,
			price: 20
		}]
	}
});
exports.product = product;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.displayCatList = displayCatList;
function catLiTemp(cat, item) {
	var itemOffset = item % 2 == 0 ? ' col-sm-offset-1' : '';
	return '<div class="col-sm-5' + itemOffset + '">\n\t\t\t\t\t\t<article class="cat" data-id="' + cat.id + '">\n\t\t\t\t\t\t\t<div class="cat__img"><img src="' + cat.img + '" alt=""></div>\n\t\t\t\t\t\t\t<div class="cat__title">\n\t\t\t\t\t\t\t\t<h5>' + cat.title + '</h5>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="cat__descr">' + cat.desc + '</div>\n\t\t\t\t\t\t\t<div class="cat__opt"><input type="checkbox" id="cat__check--' + cat.slug + '" class="cat__check"><label for="cat__check--' + cat.slug + '" class="cat__label"><img class="cat__icon" src="assets/images/icon-check.svg"></label></div>\n\t\t\t\t\t\t</article>\n\t\t\t\t\t</div>';
}

function displayCatList(cats) {
	var template = '';

	cats.categories.forEach(function (cat, item) {
		template += catLiTemp(cat, item);
	});

	return template;
}

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.displayGrades = displayGrades;
exports.displayVolumes = displayVolumes;
function gradeLiTemp(grade, isCustom) {
	var customCls = isCustom ? ' prop-item--custom' : '';
	return '<li class="product__prop-item prop-item' + customCls + '">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="prop-item__title">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h6>' + grade.title + '</h6><a href="#" data-id="' + grade.id + '">подробнее</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="prop-item__opts">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="prop-item__cust">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="prop-item__minus">-</div><span>0%</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="prop-item__plus">+</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="prop-item__single">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class="product__type-check"></i>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</li>';
}

function displayGrades(product) {

	var grades = '';

	if (product.custom) {
		product.grades.forEach(function (gr, item) {
			grades += gradeLiTemp(gr, true);
		});
	} else {
		product.grades.forEach(function (gr, item) {
			grades += gradeLiTemp(gr, false);
		});
	}

	return grades;
}

function volLiTemp(vol) {
	return '<li class="product__vol-item">' + vol + '</li>';
}

function displayVolumes(vol) {
	var vols = '';

	vol.forEach(function (gr, item) {
		vols += volLiTemp(gr, true);
	});

	return vols;
}

},{}]},{},[2])


//# sourceMappingURL=build.js.map
