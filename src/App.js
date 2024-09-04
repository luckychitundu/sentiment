import React, { useState } from 'react';
import axios from 'axios';
import TweetSentimentAnalysis from './TweetSentimentAnalysis';
import BackgroundChanger from './BackgroundChanger';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tweets, setTweets] = useState([]);
  const [sentiments, setSentiments] = useState([]);
  const [tweettext,setTweettext] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY;

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to fetch tweets using Axios
  const fetchTweets = async () => {
    const fetch = require('node-fetch');
  
    const url = 'https://twitter241.p.rapidapi.com/search-v2?type=Latest&count=5&query=obama';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '7ddeb23e3emsha62f3169834ef8dp1d4816jsn5de3b2d1673c',
        'x-rapidapi-host': 'twitter241.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const results = await response.json();
  
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
  
      // Assuming setTweets and setTweettext are defined functions
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
      url: 'https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com',
      },
      data: {
        language: 'english',
        text: text,
      },
    };

    try {
      const response = await axios.request(options);
      return response.data.sentiment_list[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleAnalysis = async () => {
    const analyzedSentiments = await Promise.all(
      tweets.map(async (text) => {
        
        const myText = text.full_text;
        const sentimentResult = await analyzeSentiment(myText);
        return sentimentResult;
      })
    );

    console.log(analyzedSentiments);

    setSentiments(analyzedSentiments);
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