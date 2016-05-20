var request = require('request');
var passport = require('passport');

var Orden = function(conf) {
    this.conf = conf || {};
    if (conf) {
        this.url = this.conf.parameters.server + "cargaapi/"
    }
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
    if (req.params.data && req.params.data !== "undefined") {
        request(this.url + "1|" + req.params.data, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body));
            }
        })
    } else {
        res.json({});
    }
}

Orden.prototype.get_ingresadas_data = function(req, res, next) {
    if (req.params.data && req.params.data !== "undefined") {
        request(this.url + "2|" + req.params.data, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body));
            }
        })
    } else {
        res.json({});
    }
}
Orden.prototype.get_pagadas_data = function(req, res, next) {
    if (req.params.data && req.params.data !== "undefined") {
        request(this.url + "4|" + req.params.data, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body));
            }
        })
    } else {
        res.json({});
    }
}
Orden.prototype.post_pendientevista = function(req, res, next) {
    if (req.body.idOrder) {
        request.post({
            url: this.conf.parameters.server + "consultaapi/1",
            form: JSON.stringify({
                idOrder: req.body.idOrder
            })
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body));
            }
        })
    } else {
        res.json({});
    }
}

Orden.prototype.get_documentos_data = function(req, res, next) {
    if (req.params.data) {
        request.get(this.conf.parameters.server + "consultaapi/7|" + req.params.data + "|0",
            function(error, response, body) {
                if (!error && response.statusCode == 200) {

                    res.json(JSON.parse(body));
                }
            })
    } else {
        res.json({})
    }
}

module.exports = Orden;
