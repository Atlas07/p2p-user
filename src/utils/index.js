const ip = require('ip');

const { generateKeyPair } = require('./keygenerator');
const { streamToString, stringToStream, keyPairFormatter } = require('./io');
const { registerUser, fetchUsers } = require('./request');

const { modes } = require('../constants');

const runNode = async (mode = modes.USER_MODE, isMiner = false) => {
  try {
    if (mode === modes.USER_MODE && !isMiner) {
      let keyPair = await streamToString('./keypair.txt', keyPairFormatter);

      if (!keyPair.publicKey || !keyPair.privateKey) {
        const { publicKey, privateKey } = generateKeyPair();
        keyPair = {
          publicKey,
          privateKey,
        };
        await stringToStream('./keypair.txt', `${publicKey}:${privateKey}`);
      }

      await registerUser(keyPair.publicKey, ip.address(), 5050);
      const userList = await fetchUsers();
      console.log('userList', userList);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  runNode,
};
