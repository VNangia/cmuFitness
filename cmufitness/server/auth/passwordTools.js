var crypto = require('crypto');

//===========================
//  API
//===========================

exports.hashPassword = function(password, callback){
    var salt = generateSalt();
    return salt + md5(password + salt)
}

exports.validatePassword = function(plainPassword, hashedPassword){
    var salt = hashedPassword.substr(0, 10);
    var validHash = salt + md5(plainPassword + salt);
    return hashedPassword === validHash;
}

//===========================
//  cryptography
//===========================

var generateSalt = function(){
    var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    var salt = '';
    for (var i = 0; i < 10; i++){
        var p = Math.floor(Math.random() * set.length);
        salt += set[p];
    }
    return salt;
}

var md5 = function(str){
    return crypto.createHash('md5').update(str).digest('hex');
}
