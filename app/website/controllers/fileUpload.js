var request = require('request');
var multer = require('multer')
var upload = multer();

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

FileUpload.prototype.post_xml = function(req, res, next) {
    request.post({
        url: 'http://localhost:4100/api/fileUpload/prueba/',
        formData: {
            ordenId: req.body.oce_folioorden,
            file: req.file.buffer
        }
    }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    });
    /*request.post({
            url: 'http://localhost:4100/api/file/uplod/prueba',
            formData: {
                file: req.file,
                data: req.body
            }
        })*/
    /*req.pipe(
        request.post('http://localhost:4100/api/fileUpload//')
        .on('response', function(response) {
            console.log(response.statusCode) // 200
            console.log(response.headers['content-type']) // 'image/png'

        }))
*/
    /*  request.post({
          url: 'http://localhost:4100/api/file/uplod/prueba',
          formData: {
              file: req.file,
              data: req.body
          }
      }).on('response', function(response) {
          console.log(response.statusCode) // 200
          console.log(response.headers['content-type']) // 'image/png'

      });*/
    //console.log(req.body)
    res.json({
        ok: "ok"
    })
}

FileUpload.prototype.post_pdf = function(req, res, next) {
    res.json({
        ok: "ok"
    })
}

FileUpload.prototype.post_prueba = function(req, res, next) {
    console.log("En prueba")
    console.log(req.body)
    console.log(req.file)

    res.json({
        ok: "ok"
    })
}


module.exports = FileUpload;
