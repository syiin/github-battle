var axios = require('axios')

module.exports = {
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
