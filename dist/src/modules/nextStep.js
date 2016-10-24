export default function() {
  if( this.step < this.pages.length ) {

      if(this.step === 0 && !this.productOptions.id) {
        swal({   title: 'Пожалуйста, выберите товар',    type: "error",   timer: 1300,   showConfirmButton: false });
        return false;
      }else if(this.step === 1 && !this.productOptions.customisable && !this.productOptions.singleGrade) {
        swal({   title: 'Пожалуйста, выберите сорт',    type: "error",   timer: 1300,   showConfirmButton: false });
        return false;
      }else if(this.step === 1 && this.productOptions.customisable && this.productOptions.allPerc < 100) {
        swal({   title: 'Кастомизация должна быть выполнена на 100%',    type: "error",   timer: 1300,   showConfirmButton: false });
        return false;
      }else if(this.step === 1 &&
              (this.productOptions.customisable && this.productOptions.allPerc === 100) ||
              (!this.productOptions.customisable && this.productOptions.singleGrade)){
        this.addToCart(this.productOptions)
      }
      if(this.step === 2 && this.cart.length === 0) {
        swal({   title: 'Ваша корзина пуста',    type: "error",   timer: 1300,   showConfirmButton: false });
        return false;
      }
      this.step++;
    }
}