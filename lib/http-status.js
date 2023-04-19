const fetch = require("node-fetch");

async function checkStatus(url) {
  try {
    await fetch(url, { method: "GET" });
    return false;
  } catch (error) {
    return true;
  }
}

module.exports = {
  checkStatus,
};
