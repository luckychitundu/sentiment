import React, { useState } from 'react';
import axios from 'axios';
import TweetSentimentAnalysis from './TweetSentimentAnalysis';
import BackgroundChanger from './BackgroundChanger';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tweets, setTweets] = useState([]);
  const [sentiments, setSentiments] = useState([]);
  const [tweettext, setTweettext] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY;

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to fetch tweets using Axios
  const fetchTweets = async () => {
    const options = {
      method: 'GET',
      url: 'https://twitter241.p.rapidapi.com/search-v2',
      params: {
        type: 'Top',
        count: '5',
        query: searchQuery,
      },
      headers: {
        'x-rapidapi-key': '7ddeb23e3emsha62f3169834ef8dp1d4816jsn5de3b2d1673c',
        'x-rapidapi-host': 'twitter241.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const results = response.data;

      // Check if the timeline and entries exist before proceeding
      const instructions = results?.result?.timeline?.instructions;
      if (!instructions || !instructions.length) {
        throw new Error('Unexpected response structure: no instructions found.');
      }

      const resultEntries = instructions[0]?.entries || [];

      const tweetTexts = resultEntries.map(tweet => {
        const legacyText = tweet?.content?.itemContent?.tweet_results?.result?.legacy?.full_text;
        return legacyText || ''; // Return empty string if legacyText doesn't exist
      });

      console.log(tweetTexts);

      setTweets(tweetTexts);
      setTweettext(tweetTexts);

    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

  const handleSearch = () => {
    // Fetch tweets using Axios
    fetchTweets();
  };

  // Function to Analyze tweets fetched from the API
  const analyzeSentiment = async (text) => {
    const options = {
      method: 'POST',
      url: 'https://sentiment-analysis9.p.rapidapi.com/sentiment',
      headers: {
        'x-rapidapi-key': '7ddeb23e3emsha62f3169834ef8dp1d4816jsn5de3b2d1673c',
        'x-rapidapi-host': 'sentiment-analysis9.p.rapidapi.com',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      data: [
        {
          id: '1',
          language: 'en',
          text: text
        }
      ]
    };
    
    try {
      const response = await axios.request(options);
      const prediction = response.data[0].predictions[0].prediction;
      const probability = response.data[0].predictions[0].probability;
      
      return { prediction, probability }; // Return the prediction and probability
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnalysis = async () => {
    const analyzedSentiments = await Promise.all(
      tweets.map(async (text) => {
        const sentimentResult = await analyzeSentiment(text); // Use text directly
        return sentimentResult;
      })
    );

    console.log(analyzedSentiments);

    setSentiments(analyzedSentiments); // Set the analyzed sentiments
  };

  return (
    <div>
      <TweetSentimentAnalysis
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        tweets={tweets}
        handleAnalysis={handleAnalysis}
        sentiments={sentiments}
        tweettext={tweettext}
      />
      <BackgroundChanger />
    </div>
  );
};

export default App;
