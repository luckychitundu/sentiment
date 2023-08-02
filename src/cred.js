const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://twitter-scraper2.p.rapidapi.com/search',
  params: {
    searchTerms: 'robots',
    maxTweets: '5'
  },
  headers: {
    'X-RapidAPI-Key': '',
    'X-RapidAPI-Host': 'twitter-scraper2.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}

// 7ddeb23e3emsha62f3169834ef8dp1d4816jsn5de3b2d1673c

//import BackgroundChanger from './BackgroundChanger';
