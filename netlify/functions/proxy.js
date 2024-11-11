const axios = require("axios");

exports.handler = async function (event, context) {
  const { url } = event.queryStringParameters;
  const apiKey = process.env.NEXT_PUBLIC_NEWS_SECRET_KEY;

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
