const axios = require('axios');

const convert_API_URL =
  'http://data.fixer.io/api/latest?access_key=bc138d134c10d8655786bae74c786f96&format=1';
const countries_API_URL = 'https://restcountries.eu/rest/v2/all';

const countriesThatAccept = async currency => {
  const { data } = await axios.get(countries_API_URL);
  return data
    .filter(function(country) {
      return country.currencies.some(function(curr) {
        return curr.code === currency;
      });
    })
    .map(function(country) {
      return country.name;
    });
};

const convert = async (from, to, amount) => {
  const {
    data: { rates }
  } = await axios.get(convert_API_URL);
  const result = (amount * rates[to]) / rates[from];
  const message = `${amount} ${from} is worth ${result} ${to}`;
  const countries = await countriesThatAccept(to);

  console.log(message + '\n');
  console.log(`The countries that accept ${to} are: ${countries}`);
};

convert('CAD', 'USD', 120);

console.log('this is the master');
