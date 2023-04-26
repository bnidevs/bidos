var express = require('express');
var cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var bodyParser = require('body-parser');

// need to change these to your own client id and client secret (bidos github account)
const CLIENT_ID = "432bd0957cc93ae4fd86";
const CLIENT_SECRET = "";

var app = express();
app.use(cors());
app.use(bodyParser.json());

// getting the access token using the clientid, clientsecret and the code param as
// query params and storing it at localhost:4000/getAccessToken
// ** can also use the state param to prevent csrf attacks but this can be implemented later **
app.get('/getAccessToken', async (req, res) => {
  console.log(req.query.code);
  
  const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;
  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      "Accept": "application/json"
    }
  }).then((response) => {
    console.log(response);
    return response.json();
  }).then((data) => {
    console.log(data);
    res.json(data);
  // if there is an error with the api request
  }).catch((error) => {
    console.log(error);
  });
});

// getting the user data using the github api and the access token
// and storing it at localhost:4000/getUserData
app.get('/getUserData', async (req, res) => {
  req.get('Authorization'); // bearer token
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      "Authorization": req.get('Authorization') // bearer token
    }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
    res.json(data);
  }).catch((error) => {
    console.log(error);
  });
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});