import React, { useState } from 'react';
import axios from 'axios';

function SentimentAnalysis() {
  const [sentiments, setSentiments] = useState([]);
  const tweetsToAnalyze = ['I am feeling great', 'no power today', 'going to work'];
  console.log(tweetsToAnalyze);

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
      tweetsToAnalyze.map(async (text) => {
        const sentimentResult = await analyzeSentiment(text);
        return sentimentResult;
      })
    );

    setSentiments(analyzedSentiments);
  };

  return (
    <div>
      <h1>Sentiment Analysis using API</h1>

      <button onClick={handleAnalysis}>Analyze Sentiment</button>

      {sentiments.length > 0 && (
        <div>
          <h2>Analysis Results</h2>
          <ul>
            {sentiments.map((sentiment, index) => (
              <li key={index}>
                <p>Text: {tweetsToAnalyze[index]}</p>
                <p>Compound: {sentiment.compound}</p>
                <p>Negative: {sentiment.neg}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SentimentAnalysis;
