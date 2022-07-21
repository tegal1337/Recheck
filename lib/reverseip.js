const axios = require("axios");
const { CURRENT_API } = require("./constant");
module.exports = {
    reverseIP : async (url) => {
        try {
            const res = await axios.get(CURRENT_API+url);
            // split bt newline
            const splitted = res.data.split("\n");
            // remove empty line
            const filtered = splitted.filter(line => line.length > 0);
          //  console.log(filtered);
            return filtered;
        } catch (error) {
            console.log("Limit reached");
            return error;
        }
    }
}
