const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const {token, port} = require('./env.js');

const app = express();
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log(req.body);
  let message = getMessage(req.body);
  let chatId = getChatId(req.body);
  console.log('chat = ' + chatId + ', text = ' + message);
  request({
    url: `https://api.telegram.org/bot${token}/sendMessage`,
    qs: { chat_id: chatId, text: `You said "${message}". HAHAHAHA Idiot.` }
  }, function (err, res2, body) {
    if (err) { console.log(err); res.sendStatus(400); return; }
    console.log("We is good is: " + res2.body);
    res.sendStatus(200);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function getMessage(body) {
  try {
    return body.message.text;
  } catch (e) {
    return '';
  }
}

function getChatId(body) {
  try {
    return body.message.chat.id;
  } catch (e) {
    return '';
  }
}

