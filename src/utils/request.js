const request = require('request-promise');

const registerUser = (walletAddress, ip, port) => {
  const options = {
    method: 'POST',
    uri: 'http://192.168.0.100:5050/user/',
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
    uri: 'http://192.168.0.100:5050/users/',
  };

  return request.get(options);
};

module.exports = {
  registerUser,
  fetchUsers,
};
