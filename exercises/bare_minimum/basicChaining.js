/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var firstLine = Promise.promisifyAll(require('./callbackReview'));
var request = require('request');
var promisification = Promise.promisifyAll(require('./promisification'));



var fetchProfileAndWriteToFile = function (readFilePath, writeFilePath) {
  //return helper pluck(filepath)
  return firstLine.pluckFirstLineFromFileAsync(readFilePath)
    //then (user)
    .then((user) => {
      if (!user) {
        throw new Error('User does not exist');
      } else {
        return user;
      }
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        request(`https://api.github.com/users/${user}`, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.body);
          }
        });
      });
    })
    .then((data) => {
      fs.writeFileSync(writeFilePath, data, (err) => {
        if (err) {
          throw new Error('No file hehe');
        } else {
          console.log(data);
        }
      });
    });
};


// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
