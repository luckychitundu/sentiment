import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';

const TweetSentimentAnalysis = ({ searchQuery, handleInputChange, handleSearch, tweets, handleAnalysis, sentiments, tweettext }) => {
  const [filteredTweets, setFilteredTweets] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Function to handle the search action
  // const performSearch = () => {
  //   handleSearch(); // Call the handleSearch function from the parent component (App)
  //   tweets([]); // Clear the filteredTweets state when performing a new search
  // };

  // Function to handle tweet filtering
  const handleFilter = (filterType) => {
    let filteredTweets = [];
    if (filterType === 'positive') {
      filteredTweets = searchQuery
        ? tweets.filter((tweet) => tweet.score > 0)
        : [];
    } else if (filterType === 'negative') {
      filteredTweets = searchQuery
        ? tweets.filter((tweet) => tweet.score < 0)
        : [];
    } else if (filterType === 'opinion') {
      filteredTweets = searchQuery
        ? tweets.filter((tweet) => tweet.comparative >= 0.5)
        : [];
    } else if (filterType === 'factual') {
      filteredTweets = searchQuery
        ? tweets.filter((tweet) => tweet.comparative < 0.5)
        : [];
    }
    setFilteredTweets(filteredTweets);
  };

  const handleSearchButtonClick = () => {
    handleSearch();
    setShowResults(true);
  };

  const handleAnalyzeButtonClick = () => {
    handleAnalysis();
    setShowResults(false);

  };

  return (
    <div className="top-content">
      <div className="inner-bg">
        <div className="container">
          <div className="row">
            {/* ... existing component UI ... */}
            <div className="col-sm-10 col-sm-offset-1 text">
              <h1><strong>Tweets</strong> Analysis</h1>
              <div className="description">
                <p>
                  Search for your favorite topic on Twitter using <strong>Sentiment</strong> filters!
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 form-box">
              <div className="form-top">
                <div className="form-top-left">
                  <h3>What tweets do you want to see!</h3>
                  <p>Use the sentiment and factual filters below</p>
                </div>
                <div className="form-top-right">
                  <i className="fa fa-twitter" style={{ color: '#38A1F3' }}></i>
                </div>
              </div>

              <div className="form-bottom">
                <form role="form" id="form" className="login-form">
                  <div className="form-group">
                    <label className="sr-only" htmlFor="form-username">Username</label>
                    <input
                      type="text"
                      name="tweet_search"
                      placeholder="Enter a search topic"
                      className="form-username form-control"
                      id="form-username"
                      value={searchQuery}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="row search_tweets">
                    <div className="col-sm-offset-3 col-sm-6">
                      <button type="button" onClick={handleSearchButtonClick} className="btn">
                        Search Tweets
                      </button>
                    </div>
                  </div>

                  <div className="row reset_filter">
                    <div className="col-sm-offset-3 col-sm-6">
                      <button data-toggle="tooltip" data-placement="top" title="Show all Tweets" type='button' onClick={handleAnalyzeButtonClick} className="btn">
                        Analyze Sentiment
                      </button>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-4 col-sm-offset-1">
                      <div className="row">
                        <div className="col-sm">
                          <button
                            data-toggle="tooltip"
                            data-placement="left"
                            title="Show only Positive Tweets"
                            className="btn"
                            onClick={() => handleFilter('positive')}
                          >
                            Positive Tweets
                          </button>
                        </div>
                        <div className="col-sm">
                          <button
                            data-toggle="tooltip"
                            data-placement="left"
                            title="Show only Negative Tweets"
                            className="btn"
                            onClick={() => handleFilter('negative')}
                          >
                            Negative Tweets
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-4 col-sm-offset-2">
                      <div className="row">
                        <div className="col-sm">
                          <button
                            data-toggle="tooltip"
                            data-placement="left"
                            title="Tweets which are Opinion"
                            className="btn"
                            onClick={() => handleFilter('opinion')}
                          >
                            Opinion Tweet
                          </button>
                        </div>
                        <div className="col-sm">
                          <button
                            data-toggle="tooltip"
                            data-placement="left"
                            title="Tweets which are factual"
                            className="btn"
                            onClick={() => handleFilter('factual')}
                          >
                            Factual Tweet
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>


        
            <div id="search_result">
              <ul id="search_list">
                {showResults === true ? (
                  tweets.length > 0 ? (
                    tweets.map((tweet, index) => (
                      <li key={index}>
                        <p>{tweet.full_text}</p>
                        <p>{tweet.created_at}</p>
                      </li>
                    ))
                  ) : (
                    <li>No results to display</li>
                  )
                ) : (
                  sentiments.length > 0 ? (
                    sentiments.map((sentiment, index) => (
                      <li key={index}>
                        <p>Text: {tweettext[index]}</p>
                        <p>Positive: {sentiment.pos}</p>
                        <p>Neutral: {sentiment.neu}</p>
                        <p>Negative: {sentiment.neg}</p>
                        <p>Compound: {sentiment.compound}</p>
                      </li>
                    ))
                  ) : (
                    <li>No results to display</li>
                  )
                )}
              </ul>
            </div>


          {/* ... remaining UI elements ... */}
        </div>
        
      </div>

      <div style={{fontSize:45, paddingBottom:20, marginTop:-90}}>
        <a href='https://github.com/luckychitundu/sentiment' target='_blank'><FaGithub /></a>
      </div>
    </div>
  );
};

export default TweetSentimentAnalysis;

