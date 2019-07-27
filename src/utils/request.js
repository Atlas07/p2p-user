const request = require('request-promise');

// FIXME
// For each request need to change IP
const registerUser = (walletAddress, ip, port) => {
  const options = {
    method: 'POST',
    uri: 'http://0.0.0.0:5050/user/',
    body: {
      walletAddress,
      ip,
      port,
    },
    json: true,
  };

  return request.post(options);
};

const fetchUsers = () => {
  const options = {
    method: 'GET',
    uri: 'http://0.0.0.0:5050/users/',
  };

  return request.get(options).then(res => JSON.parse(res));
};

module.exports = {
  registerUser,
  fetchUsers,
};
