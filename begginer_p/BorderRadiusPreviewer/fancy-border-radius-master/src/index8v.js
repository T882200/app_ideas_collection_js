// import all scss files via main.scss
import './scss/main.scss'
// import the full control box logic.
import FullControlBox from "./js/full_control_box";

// object with all 8 dragable generator handles
var movables = {
  left: document.getElementById('left'),
  right: document.getElementById('right'),
  bottom: document.getElementById('bottom'),
  top: document.getElementById('top'),
  leftBottom: document.getElementById('leftBottom'),
  rightBottom: document.getElementById('rightBottom'),
  bottomRight: document.getElementById('bottomRight'),
  topRight: document.getElementById('topRight')
}

// show main element border-radius, according to url hash params, if there are any.
let params = FullControlBox.loadUrlParams(window.location.href)

// initiate new movable handles, using ID's of the current handles in the HTML
var myBox = new FullControlBox({moveableElems: movables, initState: params})
