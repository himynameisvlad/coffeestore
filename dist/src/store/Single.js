import {  observable, action, computed } from 'mobx';
import Grade from './Grade';

export default class SingleProduct {

  @observable customisable
  @observable allPerc
  @observable singleGrade
  @observable isVolumeActive = false

  @observable choosenVol
  @observable choosenExtra = []
  @observable choosenMill
  @observable price = 0

    constructor(product) {
        this.title = product.title;
        this.id = product.id;
        this.img = product.img;
        this.short_desc = product.short_desc;
        this.link_desc = product.link_desc;
        this.desc = product.desc;
        this.customisable = product.custom;
        this.custom = product.custom;
        this.allPerc = 0
        this.singleGrade = null
        this.slug = product.slug;
        this.extra = [];
        this.mill = [];
        this.vol = product.vol.slice();
        this.grades = [];
        this.choosenVol = product.choosenVol;


        product.grades.map(grade => {
            this.grades.push(new Grade(grade));
        });

        product.mill.map((m, i) => {
            if(i === 0) this.choosenMill = m
            this.mill.push(m);
        });

        product.extra.map( e => {
            this.extra.push(e);
        });
    }

    @action dropVolumes = () => {
        this.isVolumeActive = !this.isVolumeActive
    }

    @action onVolumeChange = (vol) => {
        this.choosenVol = vol
    }

    @action onChooseMill = (mill) => {
        this.choosenMill = mill
    }
}