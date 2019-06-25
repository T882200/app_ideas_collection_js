// clipboard-polyfill npm package attempts to act as close as possible to the async clipboard API.
import clipboard from 'clipboard-polyfill/build/clipboard-polyfill.promise'

// Adjustable Box class - uses for adjusting preview box dimensions and border radius
export default class AdjustableBox {
  // constructor func with default parameters for html elements
  constructor ({
    shapeElemId = 'shape',
    generatorElemId = 'code',
    copyCodeId = 'copy',
    copiedCodeId = 'clipboard_copied',
    boxContainerId = 'box',
    widthInputId = 'width',
    heightInputId = 'height',
    enableAdvancedId = 'enable-advanced',
    initState = null,
    moveableElems 
  }
    = {}) {
    // set AdjustableBox properties to html elemnts by id (from func prameters)
    this.generatorElem = document.getElementById(generatorElemId)
    this.shapeElem = document.getElementById(shapeElemId)
    this.copiedCode = document.getElementById(copiedCodeId)
    this.boxContainer = document.getElementById(boxContainerId)
    this.widthInput = document.getElementById(widthInputId)
    this.heightInput = document.getElementById(heightInputId)
    
    // when widthInput changes, call func AdjustableBox.updateState, and update the rectangle width
    this.widthInput.onchange = () => { this.updateState(this.widthInput.value, 'width') }
    
    // when heightInput changes, call func AdjustableBox.updateState, and update the rectangle height
    this.heightInput.onchange = () => { this.updateState(this.heightInput.value, 'height') }
    
    this.enableAdvanced = document.getElementById(enableAdvancedId)
    
    // when enableAdvanced slider clicked, bind AdjustableBox.enableAdvancedOnClick func to this element change.
    this.enableAdvanced.onclick = this.enableAdvancedOnClick.bind(this)
    
    // set initial state.
    this.initState(initState)
    
    // init advanced custom size options.
    this.initAdvanced()
    
    // init control handles
    this.handles = this.initHandles(moveableElems)
    
    // when copyCodeId button clicked, bind AdjustableBox.setClipboard func to this element change - and copy the results.
    document.getElementById(copyCodeId).onclick = this.setClipboard.bind(this)
  }
  // end of constructor

  // ???
  initHandles (moveableElems) {
    throw new Error('You have to implement the method initHandles!')
  }
  updateBorderRadius () {
    throw new Error('You have to implement the method updateBorderRadius!')
  }
  initState (state) {
    throw new Error('You have to implement the method initState!')
  }

  // if the shape width and height aren't empty, enable custome size' and show the dimension input fields
  initAdvanced () {
    if (this.state.width !== '' && this.state.height !== '') {
      this.enableAdvanced.checked = true
      document.getElementById('dimension-input').classList.add('visible')
    }
  }

  // when custome size slider click event acccours
  enableAdvancedOnClick (e) {
    // check if enableAdvanced element is checked
    if (this.enableAdvanced.checked) {
      // show the dimension input fields
      document.getElementById('dimension-input').classList.add('visible')

      // set the width input value, to generator box offsetWidth property (change visual generator width)
      this.state.width = this.boxContainer.offsetWidth
      
      // set the height input value, to generator box offsetHeight property (change visual generator height)
      this.state.height = this.boxContainer.offsetHeight
      
      // apply changes of border radius and dimensions
      this.updateUI()
    } 
    
    // if enableAdvanced element isn't checked     
    else {
      // make the dimension-input boxes unvisibles
      document.getElementById('dimension-input').classList.remove('visible')
      // reset the dimensions
      this.updateState('', 'width')
      this.updateState('', 'height')
      this.boxContainer.style.height = ''
      this.boxContainer.style.width = ''
    }
  }

  // copy generated CSS code values
  setClipboard () {
    // show message when copy successed or faild
    clipboard.writeText(this.generatorElem.innerHTML).then(() => {
      this.copiedCode.innerHTML = '<div class="alert">Copied to clipboard 👍</div>'
    }, () => {
      this.copiedCode.innerHTML = '<div class="alert">💔 Not Supported</div>'
    })
    // delete message after 2 seconds
    setTimeout(() => {
      this.copiedCode.innerHTML = ''
    }
      , 2000)
  }

  // set hash history in this browser window
  setUrlHash (hash) {
    if (window.history && 'pushState' in window.history) {
      history.pushState(null, null, '#' + hash)
    } else {
      window.location.hash = hash
    }
  }

  // update state of prototype box dimensions
  updateState (val, key) {
    this.state[key] = val
    this.updateUI()
  }

  // update border radius by handles movement 
  updateUI () {
    this.updateBorderRadius()
    this.updateBox()
  }
  
  // update box size by custom input
  updateBox () {
    // if the user haven't enabled advanced dimens' input, return.
    if (!this.enableAdvanced.checked) {
      return
    }

    // else, set css properties according to the data entered into the application
    let styleHeight = this.state.height == '' ? '' : this.state.height + 'px'
    let styleWidth = this.state.width == '' ? '' : this.state.width + 'px'
    this.boxContainer.style.height = styleHeight
    this.boxContainer.style.width = styleWidth
    this.heightInput.value = this.state.height
    this.widthInput.value = this.state.width
  }

  // save URL params for use
  saveUrlParams () {
    throw new Error('You have to implement the method saveUrlParams!')
  }


  static loadUrlParams (url) {
    /* 
      regex explanation:
      The result is #, and then finds a two-digit number, or the number 100, a period, a double-digit or a 100-point number, a double-digit number or a 100 point, a double-digit number, hyphen, non-capturing group, double-digit or 100-point number, double-digit or 100-point number, double-digit or 100-point number, double-digit or 100-point number, zero times or one, , Zero or more times, each character except line breaks, a number between 0 and 9.
    */
    const regex = /#(\d\d?|100)\.(\d\d?|100)\.(\d\d?|100)\.(\d\d?|100)-(?:(\d\d?|100)\.(\d\d?|100)\.(\d\d?|100)\.(\d\d?|100))?-(\d*).(\d*)/gm
    
    // the params according to the url attribtes
    let paramsToAttribute = ['left', 'top', 'right', 'bottom', 'leftBottom', 'topRight', 'rightBottom', 'bottomRight', 'height', 'width']
    
    let attributes = {}
    
    // empty variable for matching results
    let m
    // if the regex doesn't fit the url end, return null
    if (!regex.test(url)) {
      return null
    }

    regex.lastIndex = 0
    
    // if the results array is not null, run the loop
    while ((m = regex.exec(url)) !== null) {
      m.forEach((match, groupIndex) => {
        if (groupIndex != 0) {
          attributes[paramsToAttribute[groupIndex - 1]] = match
        }
      })
    }
    
    // return generated attributes object
    return attributes
  }
}
