var request = require('request');
var multer = require('multer')
var uuid = require('uuid');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'app/static/files/')
  },
  filename: function (req, file, cb) {
    cb(null,uuid.v4() +"."+ file.mimetype.substring(file.mimetype.indexOf("/")+1))
  }
})

var upload = multer({ storage: storage });


var FileUpload = function(conf) {
    this.url = "http://192.168.20.9/ProveedorApi/api/cargaapi/"
    this.conf = conf || {};
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
    this.middlewares = [
        upload.single('file')
    ]
}

FileUpload.prototype.post_files = function(req, res, next) {
//saveDocumentos: function(ruta, folio, proveedor, rfc, tipoDocumento, nombre){
// return $http.post(ordenesUrl + '1|'+ ruta +'|'+ folio + '|' + proveedor + '|' + rfc + '|' + tipoDocumento + '|'+ nombre);
//}
    request.post({
        url: this.url +"1|files|"+req.body.folio+"|"+req.body.provider
        +"|"+req.body.rfc+"|"+ req.file.mimetype.substring(req.file.mimetype.indexOf("/")+1)+"|"+req.file.filename
    }, function (err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    });

    res.json({
        ok: "ok"
    })
}
module.exports = FileUpload;
