var request = require('request');
var multer = require('multer')
var uuid = require('uuid');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'app/static/files/')
    },
    filename: function(req, file, cb) {
        cb(null, uuid.v4() + "." + file.mimetype.substring(file.mimetype.indexOf("/") + 1))
    }
})

var upload = multer({
    storage: storage
});


var FileUpload = function(conf) {
    this.conf = conf || {};
    if (conf) {
        this.url = this.conf.parameters.server + "cargaapi/"
    }
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
    this.middlewares = [
        upload.array('file[]')
    ]
}

FileUpload.prototype.post_files = function(req, res, next) {
    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };

    if (req.files.length == 2) {
        if (req.files[0].mimetype != "application/pdf") {
            var temp = req.files[0];
            req.files[0] = req.files[1]
            req.files[1] = temp;
        }
        var msg = [];
        for (var i in req.files) {
            request.post({
                url: this.url + "1",
                form: JSON.stringify({
                    dir: "files",
                    folio: req.body.folio[i],
                    proveedor: req.body.provider[i],
                    rfc: req.body.rfc[i],
                    tipo: req.files[i].mimetype.substring(req.files[i].mimetype.indexOf("/") + 1),
                    nombre: req.files[i].filename,
                    idRol: req.body.idRol[i],
                    rfcProviderOC: req.body.rfcProvider[i]
                })
            }, function(err, httpResponse, body) {
                msg.push(body)
                if (msg.length == 2) {
                    msg[0] = msg[0].replaceAll('"', '')
                    msg[1] = msg[1].replaceAll('"', '')
                    res.json({
                        msg: msg
                    });
                }

            });
        }
    }
}


FileUpload.prototype.post_logo = function(req, res, next) {
    request.post({
        url: this.url + "2",
        form: JSON.stringify({
            nombre: req.files[0].filename,
            rfc: req.body.rfc,
            ext: req.files[0].filename.substring(req.files[0].filename.indexOf(".") + 1)
        })
    }, function(err, httpResponse, body) {
        res.json(JSON.parse(body));
    });
}

module.exports = FileUpload;
