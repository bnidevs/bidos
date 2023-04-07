const express = require('express');
const axios = require('axios');

const CLIENT_ID = "432bd0957cc93ae4fd86";
const CLIENT_SECRET = "";

const app = express();

app.get('/login', async (req, res) => {
    const { code } = req.query;
    console.log(code);

  // Exchange code for access token
  const response = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
  });

  const accessToken = response.data.access_token;

  // Use access token to fetch user information
  const { data } = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  console.log(data);

  // Redirect user to dashboard page or set user session, etc.
  res.redirect('/login');
});

app.listen(4000, () => {
    console.log("axios server running on port 4000");
});