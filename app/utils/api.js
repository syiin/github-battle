var axios = require('axios')

function getProfile (username){
  return axios.get('https://api.github.com/users/' + username + params)
    .then(function(user){
      return user.data;
    })
}

function getRepos (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + '&per_page=100');
}

function getStartCount (repos) {
  return repos.data.reduce(function(count, repo){
    return count + repo.stargazers_count
  }, 0);
}

function calculateScore (profile, repos) {
  var followers = profile.followers;
  var totalStars = getStartCount(repos);

  return (followers * 3) + totalStars;
}

function getUserData (player){
  //collect promises in an array that is resolved
  return axios.all([
    getProfile(player),
    getRepos(player)
    //once all promises are resolved, access the data. getProfile is resolved
    //at index 0 and getrepos at 1
  ]).then(function(data){
    var profile = data[0];
    var repos = data[1];
    //return an object with the player profile and score saved
    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}

function handleError(error){
  console.warn(error);
  return null;
}

function sortPlayers(players) {
  return players.sort(function(a,b){
    return b.score - a.score;
  });
}


module.exports =
{
  //create a function called battle that takes an array of players
  battle: function(players) {
    //map over the players to get API request promises then resolve the
    return axios.all(players.map(getUserData))
      //after all resolved, apply sortPlayers to all of them
      .then(sortPlayers)
      .catch(handleError);
  }
},
{
  fetchPopularRepos: function (language) {
    //create a request URI from a language string
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

    //handle the returned promise and pass the items in data on
    return axios.get(encodedURI)
                .then((response)=> {
                  return response.data.items
                })
  }
}
