const { prompt } = require('enquirer');
var clc = require("cli-color");
const { ERR_DOMAIN, BANNER, QUESTION, VALIDATOR, INPUT, CAPTION , FAQ} = require('./lib/constant');
const { reverseIP } = require('./lib/reverseip');
const { checkStatus } = require('./lib/http-status');
const fs = require("fs");

const question = [
  {
    type: 'input',
    name: INPUT,
    message: QUESTION,
    validator: VALIDATOR,
    warning: ERR_DOMAIN
  }
];

console.log(clc.greenBright(BANNER) + "\n" + clc.blueBright(CAPTION) + "\n" + clc.yellowBright(FAQ) + "\n");

async function start() {
  let result = await prompt(question);
  const res = await reverseIP(result.domain);
 
  console.log(clc.greenBright("Found Link ") + " : " + clc.cyan(res.length) + "\n");
  fs.writeFileSync(`./result/${result.domain}.txt`, JSON.stringify(res), 'utf8');
  for (let i = 0; i < res.length; i++) {
    try {
     
      //check if url not include http://
      if (res[i].indexOf("http://") === -1) {
        res[i] = `http://${res[i]}`;
      }

      const status =  await checkStatus(res[i]);
    //  console.log(status)
      if (status) {
        console.log(`${clc.bgBlueBright(res[i])} ${clc.bgGreen(clc.whiteBright("is possible to takeover"))}`);
        // write to file
        fs.appendFileSync(`./result/possible.txt`, `${res[i]}\n`, 'utf8');
      } else{
        console.log(`${clc.blueBright(res[i]) + " : " + status} ${clc.bgRed(clc.whiteBright("is alive and doesn't possible to takeover"))}`);
      }

    } catch (error) {
      console.log(clc.red(error));
    }

    await new Promise(resolve => { setTimeout(resolve, 1000) });
  }
}

start();




