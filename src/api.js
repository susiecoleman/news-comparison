var fetch = require("node-fetch");

function articleResponse(searchTerm, source) {
  const url =
    "https://newsapi.org/v2/everything?apiKey=" +
    process.env.NEWSAPI_API_KEY +
    "&sortBy=relevancy&language=en&sources=" +
    source +
    "&q=" +
    searchTerm;
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      var article = json.articles[0];
      var content = {};
      content["headline"] = article.title;
      content["image"] = article.urlToImage;
      content["url"] = article.url;
      return content;
    });
}

module.exports = articleResponse;
