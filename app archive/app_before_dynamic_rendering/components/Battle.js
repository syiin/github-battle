var React = require('react');
var PropTypes = require('prop-types');


class PlayerInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
  }

  handleInputChange(event){
    //access the value of the input.
    //The target event property returns the element that triggered the event.
    //In this case, the input.value
    var value = event.target.value

    this.setState(function(){
      //update PlayerInput username to the input value
      return {
        username: value
      }
    })
  }

  handleInputSubmit(event){
    //prevent any server calls since none are needed
    event.preventDefault();
    //when the submit button is pressed, call the function handed to the PlayerInput
    //in on submit passing in the username state and the props.id
    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }

  render(){
    return (
      <form className='column' onSubmit={this.handleInputSubmit}>
        {/* for is a protected word in JS so htmlFor ties the label to the input id */}
        <label className='header' htmlFor='username'>{this.props.label}</label>
        <input
          id='username'
          placeholder='Enter your github username'
          type='text'
          value={this.state.username}
          onChange={this.handleInputChange}
          autoComplete='off'
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
          Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

PlayerInput.defaultProps = {
  label: 'Username'
}

class Battle extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      playerOneName: '',
      playerOneImage: null,
      playerTwoName: '',
      playerTwoImage: null
    }
    //set the context of handleFormSubmit to always be the Battle component
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  //create a function to update the state of Battle based on PlayerInput
  handleFormSubmit(id, username){
    this.setState(
      function(){
        var newState = {}
        //bracket notation will add the id + Name to make playerOneName in an object
        newState[id + 'Name'] = username;
        newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200'
        return newState
      }
    )
  }

  render(){
    //create a var that will hold the value of the current state
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;

    return (
      <div>
        <div className='row'>
          {/* If playerOneName is falsey, render PlayerInput Component. Pass an id to
            track which input and the handleFormSubmit function as a prop */}
          {!playerOneName &&
          <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleFormSubmit}
          />}

          {!playerTwoName &&
          <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleFormSubmit}
          />}
        </div>
      </div>
    )
  }
}

module.exports = Battle;
