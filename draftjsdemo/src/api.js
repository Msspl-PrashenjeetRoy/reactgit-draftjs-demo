import  Environment  from './environment';

// get api url
// var url               = Environment.BASE_URL;
var url_node          = Environment.BASE_URL_NODE;
// var clientCredentials = Environment.CLIENT_CREDENTIALSDETAILS;
// var oathaccesstoken   = Environment.CLIENT_OATHACCESSTOKEN;

class Api {
  static headerParams = { 'Accept': 'application/json', 'content-type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': 'https://developer.mozilla.org' };
  static headerParamsFormdata = { 'Accept': 'application/json', 'content-type': 'multipart/form-data' };

  static queryParams = function(source) {
    var array = [];
    for (var key in source) {
      array.push(key + '=' + source[key] );
    }
    return array.join('&');
  }

  //node api
  static postApi(...params) {
    // console.log(url_node);

    // return false;

    let apiUrl = url_node + params[0];

    // console.log(apiUrl);


     fetch(apiUrl, {
        method : 'POST',
        headers: this.headerParams,
        body   : this.queryParams(params[1])
      })
      .then(res => res.json())
      .then(
        (result) => {

          // console.log(result);
          console.log(params);
          if (result){
            params[2](result,'');
          }
          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      )


    // return false;
    // fetch(apiUrl, {
    //   method : 'POST',
    //   headers: this.headerParams,
    //   body   : this.queryParams(params[1])
    // })
    // .then((response) => response.json())
    // .then((responseData) => {
    //   console.log(responseData);
    //   // return false;
    //   if (responseData){
    //     params[2](responseData,'');
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    //   // params[2]('', error);
    // })
    // .done();
  }
}

export default Api;
