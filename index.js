const PORT = process.env.PORT || 3000;
const express = require('express');
var axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.get('/',(req,res) =>{
  res.json('API Home Page');
})

app.get('/posts',(req,res) =>{
  var data1 = JSON.stringify({
    "operationName": "categoryTopicList",
    "variables": {
      "orderBy": "hot",
      "query": "",
      "skip": 0,
      "first": 50,
      "tags": [],
      "categories": [
        "compensation"
      ]
    },
    "query": "query categoryTopicList($categories: [String!]!, $first: Int!, $orderBy: TopicSortingOption, $skip: Int, $query: String, $tags: [String!]) {\n  categoryTopicList(categories: $categories, orderBy: $orderBy, skip: $skip, query: $query, first: $first, tags: $tags) {\n    ...TopicsList\n    __typename\n  }\n}\n\nfragment TopicsList on TopicConnection {\n  totalNum\n  edges {\n    node {\n      id\n      title\n      commentCount\n      viewCount\n      pinned\n      tags {\n        name\n        slug\n        __typename\n      }\n      post {\n        id\n        voteCount\n        creationDate\n        isHidden\n        author {\n          username\n          isActive\n          nameColor\n          activeBadge {\n            displayName\n            icon\n            __typename\n          }\n          profile {\n            userAvatar\n            __typename\n          }\n          __typename\n        }\n        status\n        coinRewards {\n          ...CoinReward\n          __typename\n        }\n        __typename\n      }\n      lastComment {\n        id\n        post {\n          id\n          author {\n            isActive\n            username\n            __typename\n          }\n          peek\n          creationDate\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    cursor\n    __typename\n  }\n  __typename\n}\n\nfragment CoinReward on ScoreNode {\n  id\n  score\n  description\n  date\n  __typename\n}\n"
  });
  var config1 = {
    method: 'post',
    url: 'https://leetcode.com/graphql',
    headers: { 
      'authority': 'leetcode.com', 
      'accept': '*/*', 
      'accept-language': 'en', 
      'content-type': 'application/json', 
      'origin': 'https://leetcode.com', 
      'referer': 'https://leetcode.com/discuss/compensation?currentPage=&orderBy=hot&query=', 
      'sec-fetch-mode': 'cors', 
      'sec-fetch-site': 'same-origin', 
      'Cookie': 'csrftoken=RgJzhNX1jLZFOFaeyk7mCIpjS8Lfd1nQoPxeDMQ8C18vr2GZNm9PjWnfN88ho8vO'
    },
    data : data1
  };
  axios(config1)
      .then(function (response) {
          const result = response.data;
          res.json(result);
      })
      .catch(function (error) {                
          console.log(error);
      });
})

app.get('/posts/:postid',(req,res) =>{
  var data2 = JSON.stringify({
    "operationName": "DiscussTopic",
    "variables": {
      "topicId": req.params.postid
    },
    "query": "query DiscussTopic($topicId: Int!) {\n  topic(id: $topicId) {\n    id\n    viewCount\n    topLevelCommentCount\n    subscribed\n    title\n    pinned\n    tags\n    hideFromTrending\n    post {\n      ...DiscussPost\n    }\n    }\n}\n\nfragment DiscussPost on PostNode {\n  id\n  voteCount\n  voteStatus\n  content\n  updationDate\n  creationDate\n  status\n  isHidden\n  coinRewards {\n    ...CoinReward\n   }\n  author {\n    isDiscussAdmin\n    isDiscussStaff\n    username\n    nameColor\n    activeBadge {\n      displayName\n      icon\n    }\n    profile {\n      userAvatar\n      reputation\n     }\n    isActive\n   }\n  authorIsModerator\n  isOwnPost\n }\n\nfragment CoinReward on ScoreNode {\n  id\n  score\n  description\n  date\n }\n"
  });
  var config2 = {
    method: 'post',
    url: 'https://leetcode.com/graphql',
    headers: { 
      'authority': 'leetcode.com', 
      'accept': '*/*', 
      'accept-language': 'en', 
      'content-type': 'application/json', 
      'origin': 'https://leetcode.com', 
      'referer': 'https://leetcode.com/discuss/compensation/2795451', 
      'sec-fetch-mode': 'cors', 
      'sec-fetch-site': 'same-origin', 
      'Cookie': 'csrftoken=RgJzhNX1jLZFOFaeyk7mCIpjS8Lfd1nQoPxeDMQ8C18vr2GZNm9PjWnfN88ho8vO'
    },
    data : data2
  };
  axios(config2)
      .then(function (response) {
          const result = response.data;
          res.json(result);
      })
      .catch(function (error) {                
          console.log(error);
      });
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
