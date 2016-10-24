function gradeLiTemp(grade, isCustom){
	let customCls = isCustom ? ' prop-item--custom' : '';
	return (`<li class="product__prop-item prop-item${customCls}">
													<div class="prop-item__title">
														<h6>${grade.title}</h6><a href="#" data-id="${grade.id}">подробнее</a>
													</div>
													<div class="prop-item__opts">
														<div class="prop-item__cust">
															<div class="prop-item__minus">-</div><span>0%</span>
															<div class="prop-item__plus">+</div>
														</div>
														<div class="prop-item__single">
															<i class="product__type-check"></i>
														</div>
													</div>
												</li>`);
}

export function displayGrades(product) {

	let grades = '';

	if(product.custom) {
		product.grades.forEach((gr, item) => {
			grades += gradeLiTemp(gr, true)
		})
	}else{
		product.grades.forEach((gr, item) => {
			grades += gradeLiTemp(gr, false)
		})
	}

	return grades

}

function volLiTemp(vol){
	return (`<li class="product__vol-item">${vol}</li>`);
}

export function displayVolumes(vol) {
	let vols = '';

	vol.forEach((gr, item) => {
		vols += volLiTemp(gr, true)
	})

	return vols
}