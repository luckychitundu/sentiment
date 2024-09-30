import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const TweetSentimentAnalysis = ({ searchQuery, handleInputChange, handleSearch, tweets, handleAnalysis, sentiments, tweettext }) => {
  const [filteredTweets, setFilteredTweets] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Function to handle tweet filtering based on prediction value
  const handleFilter = (filterType) => {
    let filteredTweets = [];
    if (filterType === 'positive') {
      filteredTweets = sentiments.filter((sentiment) => sentiment?.prediction === 'positive');
    } else if (filterType === 'negative') {
      filteredTweets = sentiments.filter((sentiment) => sentiment?.prediction === 'negative');
    } else if (filterType === 'opinion') {
      // Placeholder functionality for opinion filtering
      filteredTweets = sentiments.filter(() => true); // Just include all tweets for now
    } else if (filterType === 'factual') {
      // Placeholder functionality for factual filtering
      filteredTweets = sentiments.filter(() => true); // Just include all tweets for now
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
            <div className="col-sm-10 col-sm-offset-1 text">
              <h1><a href=""><strong>Tweets</strong> Analysis</a></h1>
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
                      autoComplete="off"
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
                            Opinion Tweets
                          </button>
                        </div>
                        <div className="col-sm">
                          <button
                            data-toggle="tooltip"
                            data-placement="left"
                            title="Tweets which are Factual"
                            className="btn"
                            onClick={() => handleFilter('factual')}
                          >
                            Factual Tweets
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
              {showResults ? (
                tweets.filter(tweet => tweet.trim() !== '').length > 0 ? ( // Filter out empty tweets
                  tweets.filter(tweet => tweet.trim() !== '').map((tweet, index) => ( // Map only non-empty tweets
                    <li key={index}>
                      <p>{tweet}</p>
                    </li>
                  ))
                ) : (
                  <li>No results to display</li>
                )
              ) : (
                sentiments.length > 0 ? (
                  sentiments.map((sentiment, index) => (
                    sentiment ? ( // Add a guard to ensure sentiment is defined
                      <li key={index}>
                        <p>Text: {tweettext[index]}</p>
                        <p>Probability: {(sentiment.probability * 100).toFixed(2)}%</p>
                        <p>Prediction: {sentiment.prediction}</p>
                      </li>
                    ) : null
                  ))
                ) : (
                  <li>No sentiment results to display</li>
                )
              )}
            </ul>
          </div>

        </div>

      </div>

      <div style={{ fontSize: 35, paddingBottom: 20, marginTop: -90 }}>
        <a href='https://www.linkedin.com/in/lucky-chitundu/' target='_blank' rel="noreferrer" style={{marginRight: 20}}>
          <FaLinkedin />
        </a>
        <a href='https://github.com/luckychitundu/sentiment' target='_blank' rel="noreferrer" style={{marginRight: 20}}>
          <FaGithub />
        </a>
        <a href='https://www.instagram.com/lcchitundu/?igsh=eWx0aDgwN2prMXB2&utm_source=qr' target='_blank' rel="noreferrer">
          <FaInstagram />
        </a>
      </div>
    </div>
  );
};

export default TweetSentimentAnalysis;
