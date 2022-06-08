var crypto = require("crypto");

var pwHash = crypto.createHash('sha1');

console.log(pwHash);

const tes = pwHash.digest('base64');

console.log(tes);