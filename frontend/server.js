var express = require('express');
var cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var bodyParser = require('body-parser');

const CLIENT_ID = "432bd0957cc93ae4fd86";
const CLIENT_SECRET = "";

var app = express();
app.use(cors());
app.use(bodyParser.json());

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
  }).catch((error) => {
    console.log(error);
  });
});

// getting the user data
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