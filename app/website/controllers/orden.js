var request = require('request');
var passport = require('passport');

var Orden = function(conf) {
    this.url = "http://192.168.20.9/ProveedorApi/api/cargaapi/"
    this.conf = conf || {};
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
    this.middlewares = [
        passport.authenticate('bearer', {
            session: false
        })
    ]
}

Orden.prototype.get_pendientes_data = function(req, res, next) {
    if (req.params.data) {
        request(this.url + "1|" + req.params.data, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body));
            }
        })
    }
}

Orden.prototype.get_ingresadas_data = function(req, res, next) {
    if (req.params.data) {
        request(this.url + "2|" + req.params.data, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body));
            }
        })
    }
}
Orden.prototype.get_pagadas_data = function(req, res, next) {
    if (req.params.data) {
        request(this.url + "4|" + req.params.data, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body));
            }
        })
    }
}

module.exports = Orden;
