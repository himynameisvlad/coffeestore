export default function(e) {
  e.preventDefault()
  this.setState({stepChanging: true})
  let currentStep = this.state.step
  if( currentStep === 1 && !this.stepChanging ) {
    store.prevStep()//TODO: set prev step to state
    this.setState({
      step: --currentStep,
      currentPage: this.state.pages[currentStep]
    })
  }else if( store.step === 0 ) {
    this.closeStore()
  }else if( store.step === 2) {
    store.step = 0
    store.product = {title: '', id: '', desc: '', custom: false, mixes: [], extra: [], grades: [], vol: [], mill: [], link_desc: ''}
  }
  this.setState({stepChanging: false})
}