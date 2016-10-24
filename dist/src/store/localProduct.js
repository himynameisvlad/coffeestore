import {  observable } from 'mobx';

export default class localProduct {
    @observable qty


    constructor(product) {
        this.title = product.title;
        this.id = product.id;
        this.customisable = product.customisable;
        this.grades = [];
        this.mill = null || product.choosenMill;
        this.choosenVol = product.choosenVol;
        this.price = product.price;
        this.img = product.img;
        this.qty = 1;
        this.cartId = Date.now();

        this.extra = product.choosenExtra;

        if(this.customisable) {
            this.grades = product.grades.filter(gr => +gr.perc !== 0 )
        }else {
            this.grades.push(product.singleGrade)
        }
    }
}
