// import AdjustableBox class
import AdjustableBox from './adjustable_box'

// import Movable class
import Movable from './movable'

// SimpleControlBox Class that extends AdjustableBox class
export default class SimpleControlBox extends AdjustableBox {
  
  // initiate state of border radiuses in main page (4 points control)
  initState (state) {
    let defaultState = {
      left: 30,
      right: 30,
      top: 30,
      bottom: 30,
      width: '',
      height: '',
      advancedMode: false
    }
    // if the given state doesnt have parameters (i.e. as url hash), use defaultState instead
    this.state = state == null ? defaultState : state
  }

  // initiate all movable handles
  initHandles (moveableElems) {
    return {
      left: new Movable(moveableElems.left, this.updateState.bind(this), 'y', this.state.left, this.saveUrlParams.bind(this)),
      right: new Movable(moveableElems.right, this.updateState.bind(this), 'y', this.state.right, this.saveUrlParams.bind(this)),
      top: new Movable(moveableElems.top, this.updateState.bind(this), 'x', this.state.top, this.saveUrlParams.bind(this)),
      bottom: new Movable(moveableElems.bottom, this.updateState.bind(this), 'x', this.state.bottom, this.saveUrlParams.bind(this))
    }
  }

  // make string concatenation for border radius property
  updateBorderRadius () {
    var brd = this.state.top + '% '
    brd += (100 - this.state.top) + '% '
    brd += (100 - this.state.bottom) + '% '
    brd += this.state.bottom + '% / '
    brd += this.state.left + '% '
    brd += this.state.right + '% '
    brd += (100 - this.state.right) + '% '
    brd += (100 - this.state.left) + '% '
    
    // update boreder radius with new values
    this.shapeElem.style['border-radius'] = brd
    
    // show new values in the bottom bar
    this.generatorElem.innerHTML = brd
  }
  
  // save the b-r params in the URL line, as url hash
  saveUrlParams () {
    const { left, top, right, bottom, width, height } = this.state
    let hash = `${left}.${top}.${right}.${bottom}--${height}.${width}`
    this.setUrlHash(hash)
  }
}
