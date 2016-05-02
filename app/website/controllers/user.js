var request = require('request');

var User = function(conf) {
    this.url = "http://192.168.20.9/ProveedorApi/api/loginapi/"
    this.conf = conf || {};
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

User.prototype.post_entrar = function(req, res, next) {
  
    if (req.body.rfc && req.body.pass) {
        request.get(this.url + "1|" + req.body.rfc + "|" + req.body.pass, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body));
            }
        })
    }
}

module.exports = User;
