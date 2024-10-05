// netlify/functions/scrape.js
const axios = require('axios');

exports.handler = async (event) => {
    const { url } = JSON.parse(event.body);

    try {
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
