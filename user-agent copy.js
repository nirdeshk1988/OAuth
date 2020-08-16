const express=require('express');
const app=express();
const url=require('url');
const http=require('http');
const axios = require('axios');
const request=require('request');

const sfdcURL = 'https://login.salesforce.com/services/oauth2/authorize' ;
const callbackURL='http://localhost:3002/callback';
const consumerKey='3MVG9d8..z.hDcPLBHHerB_N8Hes3cC5lUR23OAHJ2VY2OVJxTYif12LpAVeiTPuzazZmvNUn0oJBMS1XfQ.b';

//home page
app.get('/',(req,res)=>{
    let url=sfdcURL+'?client_id='+consumerKey+'&redirect_uri='+callbackURL+'&response_type=token'
    res.redirect(url);
})

//home page
app.use('/callback',(req,res)=>{
    //console.log('-req--',req);
   // console.log(req);
    let access_token=req.params.access_token;
    console.log('---');
    res.sendfile('userAgent/callback.html');
    //get the access token and make the rest api call to salesforce
   // getSFDCRecords(res);
      
})

getSFDCRecords=(res2)=>{

  /*axios({
    method: 'get',
    url: 'http://nikhead-dev-ed.my.salesforce.com/services/data/v48.0/query/',
    headers: {
      "Authorization":"Bearer 00D7F000003hLwy!ARUAQMxm3Sv0uvVm4QSTcZei6TLsLBtM5tX9XSFRL8T5qAKFCgO8Bmi8UrSRPqaCFyIplcmf4J1mB.jX0liS.NpL75ifF_qY"     
    }
    
  }).then(function (response) {
        console.log(response);
    }).catch((err)=>{
      console.log(err)
    });*/

    axios.get('https://nikhead-dev-ed.my.salesforce.com/services/data/v48.0/query/?q=SELECT+name+from+Account',{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization':'Bearer 00D7F000003hLwy!ARUAQAIqqtMzS50Zgj0fJyTxsYdPY9hiWi8PVLS4uJdeIC9Vu5N_cWwrd3GdhimV7s9lee0bmJQPHhr485Blu.UEKlyyq7fy'   
      }
    }).then(function (response) {
    //  console.log(response);
  }).catch((err)=>{
    console.log('error-------',err)
  });

 /* queryRequest={
    url: 'https://nikhead-dev-ed.my.salesforce.com/services/data/v48.0/query/?q=SELECT+name+from+Account',
    headers: {
      "Authorization":"OAuth 00D7F000003hLwy!ARUAQMxm3Sv0uvVm4QSTcZei6TLsLBtM5tX9XSFRL8T5qAKFCgO8Bmi8UrSRPqaCFyIplcmf4J1mB.jX0liS.NpL75ifF_qY"     
    }
  }
  request(queryRequest, function(err, response, body) {
      //  console.log(body);
       // console.log(response);
    });
*/

 /*   const options = {
        url:'https://nikhead-dev-ed.my.salesforce.com/services/data/v48.0/query/?q=SELECT+name+from+Account',
        method: 'GET',
        headers: {
          'Authorization': 'OAuth 00D7F000003hLwy!ARUAQMbJs.Soj99ajp7FLPZSyvb_bPxRRjKIWRq8rKM1_9tuWXbBWMrIglrE8Z05mjLr08pHnjO22tkbvpLYPiLNGE4aO2Tv'
        }
      };
      console.log('http request');
     const req = http.request(options, (res) => {
    //      console.log(res);
       console.log(`STATUS: ${res.statusCode}`);
      //  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
       // res.setEncoding('utf8');
        res.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
          console.log('No more data in response.');
        });
      }).end(); */
    //console.log('callinng the sfdc a pi'+JSON.stringify(req));
}


const port = process.env.PORT || 3002;
//http.createServer().listen(3002);
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
