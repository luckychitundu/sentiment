import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sentiment from 'sentiment';
import TweetSentimentAnalysis from './TweetSentimentAnalysis';
import BackgroundChanger from './BackgroundChanger';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tweets, setTweets] = useState([]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to fetch tweets using Axios

  useEffect(() => {
    const fetchTweets = async () => {
      const options = {
        method: 'GET',
        url: 'https://twitter-scraper2.p.rapidapi.com/search',
        params: {
          searchTerms: 'wikipedia',
          maxTweets: '5'
        },
        headers: {
          'X-RapidAPI-Key': '7ddeb23e3emsha62f3169834ef8dp1d4816jsn5de3b2d1673c',
          'X-RapidAPI-Host': 'twitter-scraper2.p.rapidapi.com'
        }
      };
  
      try {
        const response = await axios.request(options);
        const data = response.data.tweet;
        console.log(data);
  
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };
  
    fetchTweets();
  }, []);
  


  // const handleSearch = () => {
  //   // Fetch tweets using Axios
  //   fetchTweets();
    
  // };

  

  return (
    <div>
      {/* <TweetSentimentAnalysis
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
        // handleSearch={handleSearch}
        tweets={tweets}
      />

      <BackgroundChanger /> */}
      {/* <button onClick={console.log("Yes sir!")}>Click here</button>; */}
    </div>
  );
};

export default App;




// import React, { useEffect } from 'react';
// import axios from 'axios';

// function ApiDataLogger() {
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
//         const data = response.data;

//         console.log('API Data:', data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array to ensure the effect runs only once

//   return (
//     <div>
//       <p>Check the console to see API data logged.</p>
//     </div>
//   );
// }

// export default ApiDataLogger;


