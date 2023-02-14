const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const gen = require("crypto");
const express = require("express");
const router = express.Router();
import { Octokit } from "octokit";

const db = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const octokit = new Octokit({
  auth: "YOUR-TOKEN",
});

router.get("/", async function (req, res, next) {
  try {
    const projectParams = {
      TableName: "bidos-projects",
      IndexName: "vis-index",
      KeyConditionExpression: "vis = :vis",
      ExpressionAttributeValues: {
        ":vis": { S: "public" },
      },
      ProjectionExpression: "project_name, tagline, project_pool",
    };

    await db.query(projectParams, (err, data) => {
      if (err) {
        console.log(err);
        throw new Error(err.toString());
      }
      res.status(200).send({
        status: "success",
        projects: data,
      });
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.toString(),
    });
  }
});

router.get("/search", async function (req, res, next) {
  try {
    if (!req.query.name) {
      res.status(500).send({
        status: "error",
        message: "no args",
      });
      return;
    }

    const projectParams = {
      TableName: "bidos-projects",
      IndexName: "project_name-index",
      KeyConditionExpression: "project_name = :project_name",
      ExpressionAttributeValues: {
        ":project_name": { S: req.query.name },
      },
    };

    await db.query(projectParams, (err, data) => {
      if (err) {
        throw new Error(err.toString());
      }
      res.status(200).send({
        status: "success",
        projects: data,
      });
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.toString(),
    });
  }
});

//RESPONSE OBJECT TO GET ALL COMMITS

/*
[
  {
    "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
    "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
    "node_id": "MDY6Q29tbWl0NmRjYjA5YjViNTc4NzVmMzM0ZjYxYWViZWQ2OTVlMmU0MTkzZGI1ZQ==",
    "html_url": "https://github.com/octocat/Hello-World/commit/6dcb09b5b57875f334f61aebed695e2e4193db5e",
    "comments_url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e/comments",
    "commit": {
      "url": "https://api.github.com/repos/octocat/Hello-World/git/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      "author": {
        "name": "Monalisa Octocat",
        "email": "support@github.com",
        "date": "2011-04-14T16:00:49Z"
      },
      "committer": {
        "name": "Monalisa Octocat",
        "email": "support@github.com",
        "date": "2011-04-14T16:00:49Z"
      },
      "message": "Fix all the bugs",
      "tree": {
        "url": "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
        "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
      },
      "comment_count": 0,
      "verification": {
        "verified": false,
        "reason": "unsigned",
        "signature": null,
        "payload": null
      }
    },
    "author": {
      "login": "octocat",
      "id": 1,
      "node_id": "MDQ6VXNlcjE=",
      "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      "gravatar_id": "",
      "url": "https://api.github.com/users/octocat",
      "html_url": "https://github.com/octocat",
      "followers_url": "https://api.github.com/users/octocat/followers",
      "following_url": "https://api.github.com/users/octocat/following{/other_user}",
      "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
      "organizations_url": "https://api.github.com/users/octocat/orgs",
      "repos_url": "https://api.github.com/users/octocat/repos",
      "events_url": "https://api.github.com/users/octocat/events{/privacy}",
      "received_events_url": "https://api.github.com/users/octocat/received_events",
      "type": "User",
      "site_admin": false
    },
    "committer": {
      "login": "octocat",
      "id": 1,
      "node_id": "MDQ6VXNlcjE=",
      "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      "gravatar_id": "",
      "url": "https://api.github.com/users/octocat",
      "html_url": "https://github.com/octocat",
      "followers_url": "https://api.github.com/users/octocat/followers",
      "following_url": "https://api.github.com/users/octocat/following{/other_user}",
      "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
      "organizations_url": "https://api.github.com/users/octocat/orgs",
      "repos_url": "https://api.github.com/users/octocat/repos",
      "events_url": "https://api.github.com/users/octocat/events{/privacy}",
      "received_events_url": "https://api.github.com/users/octocat/received_events",
      "type": "User",
      "site_admin": false
    },
    "parents": [
      {
        "url": "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
        "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e"
      }
    ]
  }
]
*/

router.post("/commits", async (req, res) => {
  const { owner, repo } = req.body;
  if (!owner || !repo) {
    return res.status(400).send("Incorrect Parameters");
  }
  const response = await octokit.request(
    "GET /repos/:owner/:repo/commits/master",
    {
      owner,
      repo,
    }
  );
  if (response.status !== 200) {
    console.error(response.data);
    return res.status(response.status).send(response.data);
  }
  const commits = [];
  response.data.forEach((commitObj) => {
    commits.push({
      url: commitObj.url,
      author: commitObj.committer.login,
      message: commitObj.commit.message,
      verified: commitObj.commit.verification.verified,
    });
  });
  console.log(commits);
  return res.status(200).send(commits);
});

module.exports = router;
