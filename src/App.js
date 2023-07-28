import React, { useState } from 'react';
import axios from 'axios';
import sentiment from 'sentiment'; // Don't forget to import sentiment
import TweetSentimentAnalysis from './TweetSentimentAnalysis';
// import TweetFilterButtons from './TweetFilterButtons';
import BackgroundChanger from './BackgroundChanger';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tweets, setTweets] = useState([]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    axios
      .post('/search', { search_query: searchQuery })
      .then((response) => {
        const { success, tweets } = response.data;
        if (success) {
          // Perform sentiment analysis on the tweets
          const analyzedTweets = tweets.map((tweet) => {
            const { full_text } = tweet;
            const { score, comparative } = sentiment(full_text);
            return {
              full_text,
              score,
              comparative,
            };
          });

          setTweets(analyzedTweets);
        }
      })
      .catch((error) => {
        console.error('Error fetching tweets:', error);
      });
  };

  return (
    <div>
      <TweetSentimentAnalysis
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        tweets={tweets}
      />
      {/* <TweetFilterButtons searchQuery={searchQuery} setTweets={setTweets} /> */}
      <BackgroundChanger />
    </div>
  );
};

export default App;

// backgroundImage: `url(/background${currentImage}.jpg)`
