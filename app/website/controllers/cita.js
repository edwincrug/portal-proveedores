var ViewPrinter = require('../viewPrinter'),
    DataAccess = require('../dataAccess');

var Cita = function(conf) {
    this.conf = conf || {};
    this.view = new ViewPrinter();
    this.model = new DataAccess({
        parameters: this.conf.parameters
    });
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

//obtiene el trabajo de la cita
Cita.prototype.get_trabajo_data = function(req, res, next) {
		//Con req.query se obtienen los parametros de la url
		//Ejemplo: ?p1=a&p2=b
		//Retorna {p1:'a',p2:'b'}
		//Objeto que envía los parámetros
		var params = [];
    //Referencia a la clase para callback
    var self = this;
    //Asigno a params el valor de mis n variables

    if (req.params.data) {
        params.push({
            name: 'idCita',
            value: req.params.data,
            type: self.model.types.INT
        })
    }
    /* Agregar otro input
    if (req.params.data) {
        params.push({
            name: 'idCita',
            value: req.params.data,
            type: self.model.types.INT
        })
    }
    */

    this.model.query('SEL_UNIDAD_TRABAJO', params, function(error, result) {
        self.view.see(res, {
            error: error,
            result: result
        });
    });
}


module.exports = Cita;
