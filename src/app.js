const express = require('express');
const bodyParser = require('body-parser');
const ip = require('ip');

const { streamToString, stringToStream, keyPairFormatter } = require('./utils/io');
const { generateKeyPair } = require('./utils/keygenerator');
const { registerUser, fetchUsers } = require('./utils/request');

const app = express();
// FIXME: global variable, need to findout how to manage state in NodeJS
let users = {};

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const [port] = process.argv.slice(2);

if (!port) {
  throw new Error('provide port');
}

(async () => {
  try {
    let keyPair = await streamToString('./keypair.txt', keyPairFormatter);

    if (!keyPair.publicKey || !keyPair.privateKey) {
      const { publicKey, privateKey } = generateKeyPair();
      keyPair = {
        publicKey,
        privateKey,
      };
      await stringToStream('./keypair.txt', `${publicKey}:${privateKey}`);
    }

    // Register user and get user list
    await registerUser(keyPair.publicKey, ip.address(), port);
    users = await fetchUsers();
    console.log('users', users);
  } catch (error) {
    console.log('error', error);
  }
})();

setInterval(async () => {
  users = await fetchUsers();
  console.log('user list has been updated');
  console.log(users);
}, 1000 * 60);

app.listen(port, () => {
  console.log(`Running on ${port}`);
  console.log(`ip:${ip.address()}`);
});
