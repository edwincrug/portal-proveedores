var request = require('request');

var Empresa = function(conf) {
    this.url = "http://192.168.20.9/ProveedorApi/api/cargaapi/"
    this.conf = conf || {};
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

Empresa.prototype.get_list_data = function(req, res, next) {
    if (req.params.data) {
        request(this.url + "5|" +req.params.data, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.json(JSON.parse(body));
            }
        })
    }
}

module.exports = Empresa;
