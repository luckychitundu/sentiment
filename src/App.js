import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TweetSentimentAnalysis from './TweetSentimentAnalysis';
import BackgroundChanger from './BackgroundChanger';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tweets, setTweets] = useState([]);
  const [sentiments, setSentiments] = useState([]);
  const [tweettext,setTweettext] = useState([]);

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

        const tweetTexts = twitterData.map(tweet => tweet.full_text)
        setTweets(twitterData);
        setTweettext(tweetTexts);

        console.log(tweetTexts);

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
        'X-RapidAPI-Key': '7ddeb23e3emsha62f3169834ef8dp1d4816jsn5de3b2d1673c',
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
      tweettext.map(async (text) => {
        console.log(text)
        const sentimentResult = await analyzeSentiment(text);
        return sentimentResult;
      })
    );

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