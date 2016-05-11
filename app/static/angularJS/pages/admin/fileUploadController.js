app.controller('fileUploadController', function($scope, File) {
    $scope.uploadButton = false;
    $scope.closeButton = false;

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
                $scope.uploadButton = false;
                $scope.closeButton = true;
                $scope.$apply()
            });
            this.on("sending", function(file, xhr, formData) {
                formData.append("provider", File.order.provider);
                formData.append("rfc", File.order.rfc);
                formData.append("folio", File.order.folio);
            })
        }
    });

    $scope.uploadInvoice = function() {
        dropzone.processQueue();
    }
    $('#fileModal').on('hidden.bs.modal', function(e) {
        $scope.uploadButton = false;
        $scope.closeButton = false;
        dropzone.removeAllFiles();
    })
})
