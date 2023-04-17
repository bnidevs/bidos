const express = require('express');
const axios = require('axios');

const CLIENT_ID = "432bd0957cc93ae4fd86";
const CLIENT_SECRET = "";

const app = express();

app.get('/login', async (req, res) => {
    const { gitcode } = req.query;
    console.log("github api code param: " + gitcode);

  // Exchange code for access token
  axios({
    method: 'post',
    url: 'https://github.com/login/oauth/access_token',
    data: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: gitcode,
    },
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    const accessToken = response.data.access_token;
    console.log(`Access token: ${accessToken}`);
  })
  .catch(error => {
    console.error(error);
  });

  // console.log(accessToken);

  // Use access token to fetch user information
  // const { data } = await axios.get('https://api.github.com/user', {
  //   headers: {
  //     Authorization: `token ${accessToken}`,
  //   },
  // });

  // console.log(data);

  // Redirect user to dashboard page or set user session, etc.
  res.redirect('/login');
});

app.listen(4000, () => {
    console.log("axios server running on port 4000");
});