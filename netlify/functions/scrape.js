// netlify/functions/scrape.js
const axios = require('axios');

exports.handler = async (event) => {
    // Parsing the request body to get the URL
    let jsonBody;
    try {
        jsonBody = JSON.parse(event.body);
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, message: 'Invalid JSON input.' }),
        };
    }

    const { url } = jsonBody;
    if (!url) {
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, message: 'Missing URL in request.' }),
        };
    }

    try {
        // Make a request to the proxy API to scrape the given URL
        const response = await axios.get(`http://149.202.98.190/?url=${encodeURIComponent(url)}`);
        // Assuming the proxy API returns the content directly
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, content: response.data }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: error.message }),
        };
    }
};
