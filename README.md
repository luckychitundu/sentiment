# Twitter Sentiment Analysis Application

The Twitter Sentiment Analysis Application is a web application built using React that allows users to retrieve real-time tweets based on a search topic and perform sentiment analysis on the retrieved tweets. The application leverages two APIs to provide these features.

![Screenshot (10)](https://github.com/luckychitundu/sentiment/assets/87910852/0e5c62cb-c840-46c9-86ef-0aa88994a880)



## Features

1. **Real-Time Tweet Retrieval:** Users can enter a specific search topic, and the application will fetch a pre-determined number of real-time tweets related to the entered topic.

2. **Sentiment Analysis:** The application performs sentiment analysis on the fetched tweets and provides insights into the sentiment of the tweets. Sentiment analysis results are categorized into four factors: positive, negative, neutral, and compound.

3. **Alert System (Future Enhancement):** The application's future goal is to serve as an alert system. It will detect and notify the necessary agencies if alarming sentiments are detected from the tweets. This feature aims to provide a proactive approach to identifying potential issues or crises based on social media sentiment.

## APIs Used

1. **Twitter API:** The application utilizes the Twitter API to retrieve real-time tweets based on the user's search topic. It provides access to recent tweets that match the specified criteria.

2. **Sentiment Analysis API:** The sentiment analysis functionality is powered by a sentiment analysis API. The API analyzes the text content of the tweets and returns sentiment scores, including positive, negative, neutral, and compound values.

## How to Use

1. Enter a Search Topic: In the application's search bar, enter a specific topic for which you want to retrieve real-time tweets.

2. Retrieve Tweets: Click the "Search" button to fetch a pre-determined number of real-time tweets related to the entered topic.

3. Perform Sentiment Analysis: After retrieving tweets, click the "Analyze Sentiment" button to perform sentiment analysis on the fetched tweets. The sentiment analysis will categorize the tweets into positive, negative, neutral, and compound factors.

4. Interpret Results: Review the sentiment analysis results to gain insights into the overall sentiment of the tweets related to the search topic.

## Future Enhancements

The Twitter Sentiment Analysis Application has a promising future with plans to implement an alert system:

1. **Alert System:** The application aims to evolve into an alert system that detects and notifies relevant agencies or users if alarming sentiments are detected in the tweets. This proactive approach can help in identifying potential issues or crises in real time.

## Installation

To run the Twitter Sentiment Analysis Application locally:

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Create a `.env` file in the root directory and add your Twitter API and Sentiment Analysis API keys in the following format:

   ```
   REACT_APP_TWITTER_API_KEY=your_twitter_api_key
   REACT_APP_SENTIMENT_API_KEY=your_sentiment_api_key
   ```

4. Run the application using `npm start`.

## Acknowledgments

The Twitter Sentiment Analysis Application was built as a demonstration of using React and APIs for real-time tweet retrieval and sentiment analysis. Special thanks to the developers of the Twitter API and the Sentiment Analysis API for providing the necessary tools and resources.

## License

This project is licensed under the [MIT License](LICENSE).

---
