function catLiTemp(cat, item) {
	let itemOffset = item % 2 == 0 ? ' col-sm-offset-1' : ''
	return(`<div class="col-sm-5${itemOffset}">
						<article class="cat" data-id="${cat.id}">
							<div class="cat__img"><img src="${cat.img}" alt=""></div>
							<div class="cat__title">
								<h5>${cat.title}</h5>
							</div>
							<div class="cat__descr">${cat.desc}</div>
							<div class="cat__opt"><input type="checkbox" id="cat__check--${cat.slug}" class="cat__check"><label for="cat__check--${cat.slug}" class="cat__label"><img class="cat__icon" src="assets/images/icon-check.svg"></label></div>
						</article>
					</div>`)
}

export function displayCatList(cats) {
	let template = '';

	cats.categories.forEach((cat, item) => {
		template += catLiTemp(cat, item)
	})

	return template
}

