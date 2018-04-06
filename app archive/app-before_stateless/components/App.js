var React = require('react');
var Popular = require('./Popular')

//this is the component definition
class App extends React.Component {
  //Render() describes what the UI looks like
  render(){
    return (
      <div className='container'>
        <Popular />
      </div>

    )
  }
}

//exports our app component
module.exports = App;
