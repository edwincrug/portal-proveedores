var request = require('request');
var passport = require('passport');
var Auth = require('../modules/auth');


var User = function(conf) {
    this.url = "http://192.168.20.9/ProveedorApi/api/loginapi/"
    this.conf = conf || {};
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

User.prototype.post_entrar = function(req, res, next) {
    var self = this;
    if (req.body.rfc && req.body.pass) {
        request.get(this.url + "1|" + req.body.rfc + "|" + req.body.pass, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                if (!body.length > 0) return res.status(401).send("No autorizado");
                auth = new Auth(self.conf);
                auth.saveUser(body[0], function(err, token) {
                    if (err) return err;
                    res.json({
                        token: token
                    });
                })
            }
        })
    }
}

User.prototype.post_registrar = function(req, res, next) {
    var self = this;
    if (req.body.razon && req.body.email && req.body.rfc && req.body.pass) {
        request.post({
                url: this.url + "1|" + req.body.razon + "|" + req.body.rfc + "|" + req.body.email + "|" + req.body.pass
            },
            function(error, response, body) {
                console.log(body)
                if(error)res.send(error)
                if (!error && response.statusCode == 200) {
                  res.send("ok")
                    /*  body = JSON.parse(body);
                      if (!body.length > 0) return res.status(401).send("No autorizado");
                      auth = new Auth(self.conf);
                      auth.saveUser(body[0], function(err, token) {
                          if (err) return err;
                          res.json({
                              token: token
                          });
                      })
                      */
                }
            })
    }
}

User.prototype.get_me = function(req, res, next) {
    var self = this;
    passport.authenticate('bearer', function(err, user, info) {
        if (err) {
            console.log("Error")
            return next(err);
        }
        if (!user) {
            return res.status(401).send("No autorizado");
        }

        delete user.token
        res.json(user);
    })(req, res, next);
}



module.exports = User;
