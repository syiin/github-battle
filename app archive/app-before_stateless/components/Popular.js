var React = require('react');

class Popular extends React.Component{
  //To setup state, call the constructor class
  constructor(props){
    super(props);
    this.state = {
      //This means the default selected state is All
      selectedLanguage: 'All'
    };
    //Always make sure that updatedLanguage version of this is bound to
    //the component instance itself, NOT where ever else eg. the ul or li
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(lang){
    console.log(`The language clicked is ${lang}`)
    this.setState(function(){
      //Note: setState function returns an object containing the new state
      return {
        selectedLanguage: lang
      }
    })
  }


  render(){
    var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']

    return (
      <ul className='languages'>
        {languages.map(function(lang){
          return (
            <li
              //add an onClick listener that triggers
              //the updateLanguage function. You don't need to bind this
              //again because you already did earlier. You just pass inspect
              //in the clicked language as the parameter for the function
              onClick={this.updateLanguage.bind(null, lang)}
              //set the unique key to be the language name
              key={lang}
              //if the selected language is equal to the selectedLanguage, set
              //the style to the red color. If not, do nothing
              style={lang === this.state.selectedLanguage ? { color: '#d0021b'} : null}>
              {lang}
            </li>
          )
          //The 2nd parameter of map passes in the value of this
          //You can use an arrow function to not need this
        }, this)}
      </ul>
    )
  }
}


module.exports = Popular;
