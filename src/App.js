import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TweetSentimentAnalysis from './TweetSentimentAnalysis';
import BackgroundChanger from './BackgroundChanger';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tweets, setTweets] = useState([]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to fetch tweets using Axios

  const fetchTweets = async () => {
      const options = {
        method: 'GET',
        url: 'https://twitter-data1.p.rapidapi.com/v1.1/SearchTweets/',
        params: {
          q: searchQuery,
          count: '5'
        },
        headers: {
          'X-RapidAPI-Key': '7ddeb23e3emsha62f3169834ef8dp1d4816jsn5de3b2d1673c',
          'X-RapidAPI-Host': 'twitter-data1.p.rapidapi.com'
        }
      };
  
      try {
        const response = await axios.request(options);
        const twitterData = response.data.statuses;

        console.log(twitterData);

        setTweets(twitterData);

      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };
  

  const handleSearch = () => {
    // Fetch tweets using Axios
    fetchTweets();
    
  };
  
  return (
    <div>
      <TweetSentimentAnalysis
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        tweets={tweets}
      />
      <BackgroundChanger />
    </div>
  );
};

export default App;