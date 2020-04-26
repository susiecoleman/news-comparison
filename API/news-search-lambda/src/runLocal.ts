import { config } from 'dotenv';
import { getSearchResults } from './search';

config();
getSearchResults('uk').then((x) => console.log(JSON.stringify(x)));
