import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.twitter.com', // Replace with the actual Twitter API base URL
});

export const searchTweets = (searchQuery) => {
  return api
    .get('/search/tweets', {
      params: {
        q: searchQuery,
        tweet_mode: 'extended',
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching tweets:', error);
    });
};

