var request = require('request');

var Alerta = function(conf) {
    this.conf = conf || {};
    if (conf) {
        this.url = this.conf.parameters.server + "consultaapi/"
    }
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

Alerta.prototype.get_list_data = function(req, res, next) {
      if (req.params.data && req.params.data !== "undefined") {
          request(this.url + "5|0|" + req.params.data+"|0", function(error, response, body) {
              if (!error && response.statusCode == 200) {
                  res.json(JSON.parse(body));
              }
          })
      } else {
          res.json({});
      }
}

module.exports = Alerta;
