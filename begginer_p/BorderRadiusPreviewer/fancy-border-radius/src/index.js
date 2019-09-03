// import all scss files via main.scss
import './scss/main.scss'
// import the simple control box logic.
import SimpleControlBox from './js/simple_control_box'

// object with all 4 dragable generator handles
var movables = {
  left: document.getElementById('left'),
  right: document.getElementById('right'),
  bottom: document.getElementById('bottom'),
  top: document.getElementById('top')
}

// show main element border-radius, according to url hash params, if there are any.
let params = SimpleControlBox.loadUrlParams(window.location.href)

// initiate new movable handles, using ID's of the current handles in the HTML
var myBox = new SimpleControlBox({moveableElems: movables, initState: params})
