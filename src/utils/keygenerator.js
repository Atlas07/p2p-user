const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

const generateKeyPair = () => {
  const key = ec.genKeyPair();
  const publicKey = key.getPublic('hex');
  const privateKey = key.getPrivate('hex');

  return {
    key,
    publicKey,
    privateKey,
  };
};

module.exports = {
  generateKeyPair,
};
