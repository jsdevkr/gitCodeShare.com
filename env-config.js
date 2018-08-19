const prod = process.env.NODE_ENV === 'production';

module.exports = {
  'process.env.BACKEND_URL': prod
    ? 'https://contributhon.herokuapp.com'
    : `http://localhost:${process.env.PORT || 3000}`,
};
