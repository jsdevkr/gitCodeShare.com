const prod = process.env.NODE_ENV === 'production';

module.exports = {
  'process.env.BACKEND_URL': prod ? 'https://gitcodeshare.com' : `http://localhost:${process.env.BACKEND_PORT || 3030}`,
};
