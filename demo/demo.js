var React = require('react')
var ReactDom = require('react-dom')
var TimeInput = require('../src/components/TimeInput')

;(function render (value) {
  ReactDom.render((
    <TimeInput value={value} onChange={render}/>
  ), document.getElementById('demo-1'))
})()

;(function render (value) {
  ReactDom.render((
    <TimeInput value={value} onChange={render}/>
  ), document.getElementById('demo-2'))
})('13:00')
