import React from 'react';

const TweetFilterButtons = ({ searchQuery, tweets, setTweets }) => {
  const handleFilter = (filterType) => {
    // Filter tweets based on sentiment or type and update the state
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
    setTweets(filteredTweets);
  };

  return (
    <div>
      {/* <div className="row">
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
      </div> */}
    </div>
  );
};

export default TweetFilterButtons;
