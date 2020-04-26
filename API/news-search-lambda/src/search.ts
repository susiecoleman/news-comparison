import fetch from 'node-fetch';
import { NewsAPIResponse, Response, SearchResult } from './models';

const getSearchResults = (q: string): Promise<Response> => {
  const url = `https://newsapi.org/v2/everything?apiKey=${process.env.API_KEY}&language=en&q=${q}`;
  return fetch(url)
    .then<NewsAPIResponse>((response) => {
      console.log(JSON.stringify(response));
      return response.json();
    })
    .then<Response>((json) => {
      const articles: SearchResult[] = json.articles.map<SearchResult>(
        (article) => {
          return {
            source: article.source.name,
            headline: article.title,
            url: article.url,
          };
        }
      );
      return { statusCode: 200, body: { articles } };
    })
    .catch<Response>((error: Error) => {
      console.error(`GetSearchResultsFailed. Error${error}`);
      return {
        statusCode: 500,
        body: { errors: ['fail'] },
      };
    });
};

export { getSearchResults };
