const express = require('express');
const app = express();
const axios = require('axios');
const url = require('url');
const path = require('path');
//var popupS = require('popups');
const sfdcURL = 'https://login.salesforce.com/services/oauth2/authorize';
const callbackURL = 'http://localhost:3002/callbackurl';
const consumerKey = 'Update client Key here'//for ex: '3MVG9d8..z.hDsdvsfgwgwe8Hes3cC5lUR23OAHJ2VY2OVJxTYif12LpAVeiTPuzazZmvNUn0oJBMS1XfQ.b';
const clientSecret = 'Update Secret Here'//for ex: 'A5FE793Dwfwefwqefwe80B97F5C8874658D2690F08D13ABDC146CE8C0B7267E9A160C8BA';
let baseToeknURl = 'https://login.salesforce.com/services/oauth2/token';
let webServerUrl = baseToeknURl + '?client_id=' + consumerKey + '&client_secret=' + clientSecret + '&redirect_uri=' + callbackURL + '&grant_type=authorization_code';
let access_token;
let oauth_code;
// Set EJS as templating engine 
console.log(path.join(__dirname, '/webServer/views'));
app.set('views', path.join(__dirname, '/webServer/views'))
app.set('view engine', 'ejs');

//Redirecting to index page. 
app.get('/', (req, res) => {
  res.sendfile('webServer/index.html');
})

//STEP 1 : Redirect the URL to salesforce for authorizing.
//It will ask the user to enter salesforce user name and password to authozie the connected app.
app.get('/startFlow', (req, res, next) => {
  let url = sfdcURL + '?client_id=' + consumerKey + '&redirect_uri=' + callbackURL + '&response_type=code&prompt=login%20consent';
  res.redirect(url);
})

//STEP 2: Once user allows , salesforce will send the authorization code to Callback URL mentioned in connected app.
app.get('/callbackurl', (req, res, next) => {
  oauth_code = req.query.code;
  let accessUrl=webServerUrl+ '&code=' + oauth_code;
  res.render('step2',{
      data: {oauth_code,accessUrl}
  }); 
})
//STEP 3: After getting the auth code, will do a POST request to get the access token from salesforce
//this method will get the access toekn.
app.get('/getAccessToken', (req, res, next) => {
  getAccessTokenFromOAuthCode(oauth_code, res, next);
})
getAccessTokenFromOAuthCode = (oautCode, res, next) => {
  axios.post(webServerUrl + '&code=' + oautCode, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
  }).then(function (response) {
    //Here getting the access token.
    access_token = response.data.access_token;
    res.render('step3',{
      data: access_token
    }); 
  }).catch((err) => {
    res.render('step3',{
      data: err
    }); 
  });
}
//STEP 4: Getting the records from salesforce. Making a get request and passing the access token .
app.get('/getRecords', (req, res, next) => {
  getSFDCRecords(access_token, res);
})
getSFDCRecords = (access_token, res) => {
  axios.get('https://nikhead-dev-ed.my.salesforce.com/services/data/v48.0/query/?q=SELECT+name+from+Account', {
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  })
    .then(function (response) {
      console.log(response.data.records);
      res.render('step4',{
        data: response.data.records
      }); 
    }).catch(err => {
      console.log(err);
    })


}


const port = process.env.PORT || 3002;
//listen to server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
