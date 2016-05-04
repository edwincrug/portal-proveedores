var request = require('request');

var Sucursal = function(conf) {
    this.conf = conf || {};
    if (conf) {
        this.url = this.conf.parameters.server + "cargaapi/"
    }
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

Sucursal.prototype.get_list_data = function(req, res, next) {
    if (req.params.data && req.params.data !== "undefined") {
        request(this.url + "6|" + req.params.data, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body));
            }
        })
    } else {
        res.json({});
    }
}

module.exports = Sucursal;
