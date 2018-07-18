'use strict';

const emojis = [
  '🙂', '😃', '😄', '☺️', '😉', '😍', '🔸', '🔹', '🚀'
];

module.exports.rank = (event, context, callback) => {
  const rank = event.queryStringParameters.rank;
  const rankEmoji = emojis[rank >= emojis.length ? emojis.length - 1 : rank];
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: rankEmoji,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
