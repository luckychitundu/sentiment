import React, { useState } from 'react';
import axios from 'axios';
import sentiment from 'sentiment';
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
      url: 'https://twitter-scraper2.p.rapidapi.com/search',
      params: {
        searchTerms: searchQuery, // Use the user's search query
        maxTweets: '5'
      },
      headers: {
        'X-RapidAPI-Key': '7ddeb23e3emsha62f3169834ef8dp1d4816jsn5de3b2d1673c',
        'X-RapidAPI-Host': 'twitter-scraper2.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const data = response.data.tweet;
      
      // Perform sentiment analysis on the tweets
      const analyzedTweets = data.map((tweet) => {
        const full_text = tweet;
        console.log(full_text);
        const { score, comparative } = sentiment(full_text);
        
        return {
          full_text,
          score,
          comparative,
        }; 
        
      });
      // console.log(analyzedTweets);
      setTweets(analyzedTweets);

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
