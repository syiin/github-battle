var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');

//to import the App component
var App = require('./components/App')


ReactDOM.render(
  //specific component we want to render to the DOM
  <App />,
  //where we want to render to
  document.getElementById('app')
)
