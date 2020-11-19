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
      console.info(article);
      var content = {};
      content["headline"] = article.title;
      content["image"] =
        article.urlToImage === "null" ? "paperhat.png" : article.urlToImage;
      content["url"] = article.url;
      return content;
    })
    .catch(function () {
      return {
        headline: "No relevant article available",
        image: "paperhat.png",
        url: "",
      };
    });
}

module.exports = articleResponse;
