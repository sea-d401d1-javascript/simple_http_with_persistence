const fs = require('fs');

module.exports = exports = {};

exports.readOne = function(nameStr, callMeBack){
  var readRet = fs.readFile(nameStr, callMeBack);
  return readRet;
};

exports.writeOne = function(dataBuf, callFriendBack){
  var writeRet = fs.appendFile(__dirname + '/../dStore/basicFile.json', dataBuf, callFriendBack);
  return writeRet;
};
