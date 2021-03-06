app.controller('fileUploadController', function($scope, File, Utils, Order, AlertFactory) {
    $scope.uploadButton = false;
    $scope.closeButton = false;
    $scope.loadingOrder = true;

    $('#collapseOne').on('show.bs.collapse', function() {
        $("#collapseTwo").collapse('hide')

    })
    $('#collapseTwo').on('show.bs.collapse', function() {
        $("#collapseOne").collapse('hide')
    })

    $('#fileModal').on('shown.bs.modal', function(e) {
        $("#collapseOne").collapse('show')
        $("#collapseTwo").collapse('hide')
        $("#fileModalLabel").text("Orden " + File.order.folio)
        Order.getDocuments(File.order.folio).then(function(d) {
            if (d.data[0].arrayB) {
                var pdf = URL.createObjectURL(Utils.b64toBlob(d.data[0].arrayB, "application/pdf"))
                $("<object id='pdfDisplay' data='" + pdf + "' width='100%' height='400px' >").appendTo('#pdfContent');
            } else {
                $("<h1>No hay orden de compra disponible</h1>").appendTo('#pdfContent');
            }
            $scope.loadingOrder = false;
        });

    });


    var dropzone = new Dropzone("#fileUpload", {
        url: "api/fileUpload/files/",
        uploadMultiple: true,
        autoProcessQueue: false,
        maxFiles: 2,
        dictDefaultMessage: "Selecciona el XML y el PDF",
        dictRemoveFile: "Cancelar",
        dictCancelUpload: "Cancelar subida",
        dictCancelUploadConfirmation: "Estas seguro de cancelar la subida de este archivo?",
        addRemoveLinks: true,
        acceptedFiles: "application/pdf,text/xml",

        init: function() {
            var self = this;
            this.on("addedfile", function(file) {
                if (self.files.length == 2) {
                    $scope.uploadButton = true;
                    $scope.$apply()
                } else if (self.files.length > 2) {
                    self.removeFile(file)
                }
            });
            this.on("removedfile", function(file) {
                if (self.files.length < 2) {
                    $scope.uploadButton = false;
                    $scope.$apply()
                }
            });
            this.on("successmultiple", function(event, res) {

                AlertFactory.info(res.msg[0] + res.msg[1]);
                $scope.uploadButton = false;
                $scope.closeButton = true;
                $scope.$apply()
            });
            this.on("sending", function(file, xhr, formData) {
                formData.append("provider", File.order.provider);
                formData.append("rfc", File.order.rfc);
                formData.append("folio", File.order.folio);
                formData.append("idRol", File.order.idRol);
                formData.append("rfcProvider", File.order.rfcProvider);

            })
        }
    });

    $scope.uploadInvoice = function() {
        dropzone.processQueue();
    }
    $('#fileModal').on('hidden.bs.modal', function(e) {
        $scope.uploadButton = false;
        $scope.closeButton = false;
        $scope.loadingOrder = true;
        dropzone.removeAllFiles();
        $("#pdfContent").empty();
    })
})
