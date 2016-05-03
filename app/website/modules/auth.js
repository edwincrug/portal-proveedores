var jwt = require('jsonwebtoken');
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;

var Auth = function(config) {
    this.config = config.parameters || {};
    var self = this;
    passport.use(new Strategy(
        function(token, cb) {
            new Auth(config).verifyUser(token, function(exists) {
                if (!exists) return cb(null,false);
                jwt.verify(token, self.config.secret, function(err, decoded) {
                    if (err) return cb(err)
                    return cb(null, decoded);
                })
            });
        }));
}

Auth.users = [];

Auth.prototype.saveUser = function(user, cb) {
    var self = this;
    jwt.sign(user, self.config.secret, {}, function(err, token) {
        if (err) return cb(err);
        user.token = token;
        Auth.users.push(user);
        return cb(null, token)
    });
}

Auth.prototype.verifyUser = function(token, cb) {
    cb(Auth.users.find(function(user) {
        return user.token === token;
    }))
}


module.exports = Auth;
