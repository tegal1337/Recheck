const axios = require("axios");
const { CURRENT_API } = require("./constant");

async function reverseIP(url) {
  try {
    const res = await axios.get(CURRENT_API + url);
    const lines = res.data.split("\n");
    return lines.filter(line => line.length > 0);
  } catch (error) {
    console.log("Limit reached");
    return error;
  }
}

module.exports = {
  reverseIP,
};
