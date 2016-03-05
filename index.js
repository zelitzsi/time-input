var React = require('react')
var ReactDom = require('react-dom')
var TimeInput = require('./components/TimeInput')

function render (value) {
  ReactDom.render((
    <TimeInput value={value} onChange={render}/>
  ), document.body.firstElementChild)
}

render()
