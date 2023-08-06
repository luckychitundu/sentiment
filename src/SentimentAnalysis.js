import React, { useState } from 'react';
import axios from 'axios';

function SentimentAnalysis() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);

  const analyzeSentiment = async () => {
    const options = {
      method: 'POST',
      url: 'https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '17ddeb23e3emsha62f3169834ef8dp1d4816jsn5de3b2d1673c', // Replace with your RapidAPI key
        'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com'
      },
      data: {
        language: 'english',
        text: text // Use text instead of {text}
      }
    };

    try {
      const response = await axios.request(options);
      const sentimentData = response.data;
      console.log(sentimentData.sentiment_list);
      setSentiment(sentimentData.sentiment_list);
    } 
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Sentiment Analysis using API</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text for sentiment analysis..."
        rows={4}
      />
      <button onClick={analyzeSentiment}>Analyze Sentiment</button>

      {sentiment && (
        <div>
          <h2>Analysis Result</h2>
          <p>Text: {sentiment[0].sentence}</p>
          <p>Compound: {sentiment[0].compound}</p>
          <p>Negative: {sentiment[0].neg}</p>
        </div>
      )}
    </div>
  );
}

export default SentimentAnalysis;
