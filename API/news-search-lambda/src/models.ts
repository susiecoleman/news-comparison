interface NewsAPISource {
  name: string;
}

interface NewsAPIArticle {
  source: NewsAPISource;
  title: string;
  url: string;
}

interface NewsAPIResponse {
  articles: NewsAPIArticle[];
}

interface RequestParameters {
  q: string;
}

interface Request {
  queryStringParameters: RequestParameters;
}

interface Error {
  errors: string[];
}

interface SearchResult {
  source: string;
  headline: string;
  url: string;
}

interface SearchResults {
  articles: SearchResult[];
}

interface Response {
  statusCode: number;
  body: SearchResults | Error;
}

export { NewsAPIResponse, SearchResults, SearchResult, Request, Response };
