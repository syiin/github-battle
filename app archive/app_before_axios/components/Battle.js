var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

function PlayerPreview (props) {
  return (
    <div>
      <div className='column'>
        {/* Render a user avatar image */}
        <img
          className='avatar'
          src={props.avatar}
          alt={'Avatar for' + props.username}
        />
        {/* Render a username  */}
        <h2 className='username'>@{props.username}</h2>
      </div>
      {/* Call the onReset function from the Battle parent component via props and pass in
      the id (eg. playerONe) */}
      <button
        className='reset'
        onClick={props.onReset.bind(null, props.id)}>
        Reset
      </button>
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}

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
    this.handleReset = this.handleReset.bind(this);
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

  handleReset(id){
    this.setState(
      function(){
        var newState = {}
        //bracket notation will change player object in state
        newState[id + 'Name'] = '';
        newState[id + 'Image'] = null;
        return newState
    })
  }

  render(){
    //access the match property
    var match = this.props.match;
    //create a var that will hold the value of the current state
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;
    var playerOneImage = this.state.playerOneImage;
    var playerTwoImage  = this.state.playerTwoImage;

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
          {/* If player one's image is not null, render player view passing in data
          of playerOne from state. */}
          {playerOneImage !== null &&
            <PlayerPreview
              avatar = {playerOneImage}
              username = {playerOneName}
              onReset = {this.handleReset}
              id='playerOne'
            />}

          {!playerTwoName &&
          <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleFormSubmit}
          />}

          {playerTwoImage !== null &&
            <PlayerPreview
              avatar = {playerTwoImage}
              username = {playerTwoName}
              onReset = {this.handleReset}
              id='playerTwo'
            />}
        </div>
        {/* If playerOne and playerTwo have images, then render the link component which
        gets the request url (via match.url) and appends results to to it. Then pass
        it the playerone and player two names in the URL  */}
        {playerOneImage && playerTwoImage &&
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
            }}>
            Battle
          </Link>}
      </div>
    )
  }
}

module.exports = Battle;
