"use strict";
var path = require('path');

var session_utils = require(__base + 'app/logic/util/session_utils');

// Create new UUID for the user and redirect them to that session
function redirectToSession(req, res) {
  console.log('redirect_to_session request');
  const newUUID = session_utils.createUUID();
  res.redirect('/session/' + newUUID + '/');
}

// Send the user the base index.html page
function homepage(req, res) {
  console.log('index request');
  res.sendFile(path.join(__base + '../html/index.html'));
}


function getShortenedURL(url, cb){
  request
      .post('https://www.googleapis.com/urlshortener/v1/url')
      .query({'key': config.LINK_SHORTENER_API_KEY})
      .send({longUrl: url})
      .set('Content-Type', 'application/json')
      .end(function(err, res){
        if(!err){
          cb(null, res.body.id);
        }
        else{
          cb("Could not shorten URL", null);
        }
  });
}

function shortenURL(req, res){
  console.log('shorten URL request');
  const url = req.params.url;
  getShortenedURL(url, function(err, shortenedUrl){
    if(!err){
      res.json({shortenedURL: shortenedUrl});
    }
    else{
      res.status(404).json({error: 'Failed to shorten the link.'});
    }
  });
}

function docs(req, res){
  console.log('docs request');
  res.sendFile(path.join(__base + '../docs/index.html'));
}

module.exports = {
  redirectToSession,
  homepage,
  shortenURL,
  docs
};