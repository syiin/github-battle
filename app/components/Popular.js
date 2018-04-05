var React = require('react');
var PropTypes = require('prop-types')
var api = require('../utils/api')

function SelectLanguage (props){
  var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
  return (
    <ul className='languages'>
      {languages.map((lang)=>{
        return (
          <li
            //add an onClick listener that triggers
            //the updateLanguage function. You don't need to bind this
            //again because you already did earlier. You just pass inspect
            //in the clicked language as the parameter for the function
            onClick={props.clickFunction.bind(null, lang)}
            //set the unique key to be the language name
            key={lang}
            //if the selected language is equal to the selectedLanguage, set
            //the style to the red color. If not, do nothing
            style={lang === props.selectedLanguage ? { color: '#d0021b'} : null}>
            {lang}
          </li>
        )
      })}
    </ul>
  )
}

function RepoGrid(props){
  return (
    <ul className='popular-list'>
      {props.repos.map((repo, index)=>{
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={`Avatar for ${repo.owner.login}`}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count}</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  clickFunction: PropTypes.func.isRequired
}

//because we call .map, repos must be an array
RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

class Popular extends React.Component{
  //To setup state, call the constructor class
  constructor(props){
    super(props);
    this.state = {
      //This means the default selected state is All
      selectedLanguage: 'All',
      repos: null
    };
    //Always make sure that updatedLanguage version of this is bound to
    //the component instance itself, NOT where ever else eg. the ul or li
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount(){
    //When the component mounts, call update language passing in the default selected language
    this.updateLanguage(this.state.selectedLanguage)
  }

//Update the component state
  updateLanguage(lang){
    //Call setState and pass in a function
    this.setState(()=>{
      //Note: setState function returns an object containing the new state
      return {
        selectedLanguage: lang
      }
    });
    //call the api function passing in the selected language
    api.fetchPopularRepos(lang)
      //handle the call back by changing the state of the component
        .then((repos)=>{
          this.setState(()=>{
            return {repos: repos}
          })
        });
  }

  render(){
    return <div><SelectLanguage
              clickFunction = {this.updateLanguage}
              selectedLanguage = {this.state.selectedLanguage} />
              {/* If the repos is falsey, render Loading. Otherwise, render
                Repo Grid */}
              {!this.state.repos
                ? <p>Loading...</p>
              : <RepoGrid repos = {this.state.repos}/>}
          </div>
  }
}


module.exports = Popular;
