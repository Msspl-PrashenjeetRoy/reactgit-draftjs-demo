/*
// Calling Environment module in the my-component.js
import Environment from './environment.js';
...somewhere in your code...
let url = Environment.BASE_URL
*/


const declaredPlatform = 'staging';

const _Environments = {

  //stagings
  staging:     {
    BASE_URL_NODE            : 'http://api-platform.ocean-dev.com/',
    API_KEY                  : '12345678',
  },
};

function getPlatform(platform){
  return platform;
}

function getEnvironment() {
  const platform = getPlatform(declaredPlatform);
  // ...now return the correct environment
  return _Environments[platform];
}

const Environment = getEnvironment();

module.exports = Environment;
