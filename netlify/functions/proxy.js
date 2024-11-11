const axios = require("axios");

exports.handler = async function (event, context) {
  const {
    city,
    country = "us",
    category = "business",
  } = event.queryStringParameters;
  const apiKey = process.env.NEXT_PUBLIC_NEWS_SECRET_KEY;

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
