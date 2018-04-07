var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var Results = require('./Results');
var Popular = require('./Popular');


//this is the component definition
class App extends React.Component {
  //Render() describes what the UI looks like
  render() {
    return (
      //Create the router
      <Router>
        <div className='container'>
          {/* Render the navigation component */}
          <Nav />
            {/* Switch runs through the routes and returns the default at the end if no
            such route exists */}
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/battle/results' component={Results} />
            <Route path='/popular' component={Popular} />
            <Route render={function (){
              return <p>Not Found</p>
              }} />
          </Switch>
        </div>
      </Router>
    )
  }
}

//exports our app component
module.exports = App;
