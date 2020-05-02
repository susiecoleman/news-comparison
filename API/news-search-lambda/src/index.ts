import { getSearchResults } from './search';
import { Request } from './models';
import { config } from 'dotenv';

config();

exports.handler = async (event: Request) => {
  return getSearchResults(event.queryStringParameters.q).then((result) => {
    return {
      statusCode: result.statusCode,
      body: JSON.stringify(result.body),
    };
  });
};
