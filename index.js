const { prompt } = require('enquirer');
const clc = require("cli-color");
const fs = require("fs");
const { ERR_DOMAIN, BANNER, QUESTION, VALIDATOR, INPUT, CAPTION , FAQ } = require('./lib/constant');
const { reverseIP } = require('./lib/reverseip');
const { checkStatus } = require('./lib/http-status');

const question = [
  {
    type: 'input',
    name: INPUT,
    message: QUESTION,
    validator: VALIDATOR,
    warning: ERR_DOMAIN
  }
];

console.log(clc.greenBright(BANNER), clc.blueBright(CAPTION), clc.yellowBright(FAQ), "\n");

async function start() {
  const result = await prompt(question);
  const res = await reverseIP(result.domain);

  console.log(clc.greenBright("Found Link ") + " : " + clc.cyan(res.length) + "\n");
  fs.writeFileSync(`./result/${result.domain}.txt`, JSON.stringify(res), 'utf8');

  for (const url of res) {
    try {
      const formattedUrl = url.indexOf("http://") === -1 ? `http://${url}` : url;
      const status = await checkStatus(formattedUrl);

      if (status) {
        console.log(`${clc.bgBlueBright(formattedUrl)} ${clc.bgGreen(clc.whiteBright("is possible to takeover"))}`);
        fs.appendFileSync(`./result/possible.txt`, `${formattedUrl}\n`, 'utf8');
      } else {
        console.log(`${clc.blueBright(formattedUrl) + " : " + status} ${clc.bgRed(clc.whiteBright("is alive and it's not possible to takeover"))}`);
      }
    } catch (error) {
      console.log(clc.red(error));
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

start();