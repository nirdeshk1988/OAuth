const express=require('express');
const app=express();
const axios = require('axios');
var popup = require('window-popup').windowPopup;
const sfdcURL = 'https://login.salesforce.com/services/oauth2/authorize' ;
const callbackURL='http://localhost:3002/callbackurl';
const consumerKey='3MVG9d8..z.hDcPLBHHerB_N8Hes3cC5lUR23OAHJ2VY2OVJxTYif12LpAVeiTPuzazZmvNUn0oJBMS1XfQ.b';

app.get('/',(req,res)=>{
  res.sendfile('userAgent/index.html');
})

//STEP 1 : Redirect the URL to salesforce for authorizing.
//It will ask the user to enter salesforce user name and password to authozie the connected app.
app.get('/startFlow',(req,res)=>{
   // popup(500, 500, 'STEP 1');
    let url=sfdcURL+'?client_id='+consumerKey+'&redirect_uri='+callbackURL+'&response_type=token&prompt=login%20consent'
    
    res.redirect(url);
})

//STEP 2: Once user allows , salesforce will send the access token to Callback URL mentioned in connected app.
//Salesforce append the access token with # means it will be accesssible to Browder for security purpose. 
app.use('/callbackurl',(req,res)=>{
  // After redirect , we will extrack the access token.
    res.sendfile('userAgent/useragent.html');
      
})

const port = process.env.PORT || 3002;
//listen to server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
