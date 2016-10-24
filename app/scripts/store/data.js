export let cats = JSON.stringify({
	categories: [
		{
			title: 'Кофе',
			img: 'assets/images/cat1.jpg',
			desc: 'Пара слов о товаре. Пара<br> слов о товаре.',
			slug: '1',
			id: '12',
			custom: true
		},
		{
			title: 'Чай',
			img: 'assets/images/cat2.jpg',
			desc: 'Пара слов о товаре. Пара<br> слов о товаре.',
			slug: '2',
			id: '123',
			custom: true
		},
		{
			title: 'Печенье',
			img: 'assets/images/cat2.jpg',
			desc: 'Пара слов о товаре. Пара<br> слов о товаре.',
			slug: '3',
			id: '124',
			custom: false
		},
		{
			title: 'Орехи',
			img: 'assets/images/cat2.jpg',
			desc: 'Пара слов о товаре. Пара<br> слов о товаре.',
			slug: '4',
			id: '125',
			custom: true
		}
	]
})

export let product = JSON.stringify({
	12: {
		title: 'Кофе',
		fullDesc: 'фывафывафы',
		custom: true,
		mill: [
			'Не молоть', 'Для турки', 'Для френч'
		],
		vol: [250, 500, 1000],
		linkTitle: 'Как правильно выбрать кофе',
		extra: [
			{
				title: 'Цедра апельсина',
				price: 12
			},
			{
				title: 'Какао',
				price: 15
			}
		],
		grades: [
			{
				title: 'Бразилия Сантос 1',
				id: 5645,
				price: 10
			},
			{
				title: 'Бразилия Сантос 2',
				id: 56454,
				price: 10
			}
		]
	},
	124: {
		title: 'Печенье',
		fullDesc: 'Описание печенья',
		custom: false,
		vol: [250, 500],
		extra: [
			{
				title: 'Шоколад',
				price: 12
			},
			{
				title: 'Какао',
				price: 15
			}
		],
		grades: [
			{
				title: 'Шоколадное',
				id: 5645546,
				price: 10
			},
			{
				title: 'Другое печенье',
				id: 56454445,
				price: 20
			}
		]
	}
})