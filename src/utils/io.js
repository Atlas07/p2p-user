const fs = require('fs');

const keyPairFormatter = (data) => {
  const [publicKey, privateKey] = data.split(':');

  return {
    publicKey,
    privateKey,
  };
};

const streamToString = (filePath, formatter = data => data) => {
  const stream = fs.createReadStream(filePath);
  const chunks = [];

  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });
    stream.on('error', reject);
    stream.on('end', () => {
      const data = formatter(Buffer.concat(chunks).toString());
      resolve(data);
    });
  });
};

const stringToStream = (filePath, data) => {
  const stream = fs.createWriteStream(filePath);

  return new Promise((resolve, reject) => {
    stream.write(data);
    stream.end();

    stream.on('error', reject);
    stream.on('finish', resolve);
  });
};

module.exports = {
  stringToStream,
  streamToString,
  keyPairFormatter,
};
