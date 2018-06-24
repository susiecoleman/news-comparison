# News Comparison

Search engine to compare how different news sources cover the same topic.

[http://news-comparison.herokuapp.com/](http://news-comparison.herokuapp.com/)

Currently a WIP

## Seting up the application

Run `npm install`

Sensitive information such as API keys are stored in the `.env` file when developing locally. This file needs to contain:

```
NEWSAPI_API_KEY=key
```
To allow the app to access:
[News API](https://newsapi.org/)

## Running the application

Run `node server.js`

The application will now be available at [http://localhost:5000](http://localhost:5000/)

## Deploying the application

The application is hosted on Heroku and was set up with [this guide](https://devcenter.heroku.com/articles/deploying-nodejs)

To deploy to Heroku run `git push heroku master`. Which will deploy the version of the code on master to Heroku and [http://news-comparison.herokuapp.com/](http://news-comparison.herokuapp.com/)