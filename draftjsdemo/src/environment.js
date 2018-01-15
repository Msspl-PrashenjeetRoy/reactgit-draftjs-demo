/*
// Calling Environment module in the my-component.js
import Environment from './environment.js';
...somewhere in your code...
let url = Environment.BASE_URL
*/


const declaredPlatform = 'staging';

const _Environments = {
  production:     {
    BASE_URL              : 'http://api.oceanhub.com/',
    BASE_URL_NODE         : 'http://api-platform.oceanhub.com/', //'http://platform-api.oceanhub.com:3012/',
    API_KEY               : '12345678',
    CLIENT_OATHACCESSTOKEN: 'users/generateOauthAccessToken.json',
    CLIENT_CREDENTIALSDETAILS: {
      'grant_type'    : 'client_credentials',
      'client_id'     : '36b187121c4061567c2b15662e66aed7',
      'client_secret' : 'a5ee0830138a3baa65cf8e5d21185b14'
    },
    AUTHCLIENTID    : 'xJquZcKOFYmr6ve10Vv9XyCErrQlbgsz',
    AUTHDOMAIN      : 'oceanhub.eu.auth0.com',
    AUTHCONNECTIONS : ['facebook', 'linkedin', 'oh-production']
  },

  //stagings
  staging:     {
    BASE_URL                 : 'http://api.ocean-dev.com/',
    BASE_URL_NODE            : 'http://api-platform.ocean-dev.com/',  //'http://platform-api.ocean-dev.com:3010/',
    API_KEY                  : '12345678',
    CLIENT_OATHACCESSTOKEN   : 'users/generateOauthAccessToken.json',
    CLIENT_CREDENTIALSDETAILS: {
      'grant_type'    : 'client_credentials',
      'client_id'     : '36b187121c4061567c2b15662e66aed7',
      'client_secret' : 'a5ee0830138a3baa65cf8e5d21185b14'
    },
    AUTHCLIENTID    : 'xpG2tfARSoue8zYpWkDk23vY2HKeiCz5',
    AUTHDOMAIN      : 'oceanhub-dev.eu.auth0.com',
    AUTHCONNECTIONS : ['facebook', 'linkedin', 'oh-development']
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
