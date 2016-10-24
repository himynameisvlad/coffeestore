import {  observable } from 'mobx'

export default class Grade {

  @observable perc
  @observable checked
    constructor(grade) {
        this.title = grade.title
        this.id = grade.id;
        this.desc = grade.desc
        this.perc = 0;
        this.checked = false;
        this.price = grade.price;
    }
}