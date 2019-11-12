/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');
// var readline = require('readline');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      callback(err);
    } else {
      var encoded = data.toString('utf8');
      var firstLine = encoded.split('\n')[0];
      callback(null, firstLine);
    }
  });
  // var rl = readline.createInterface({
  //   input: fs.createReadStream(filePath),
  //   output: process.stdout
  // });
  // rl.on('line', (line) => {
  //   callback(null, line);
  //   rl.close();
  // });
};


// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request(url, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
