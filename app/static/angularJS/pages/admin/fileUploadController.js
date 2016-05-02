app.controller('fileUploadController', function($scope ,FileUploader,File) {

    $scope.xmlUploader = new FileUploader({
        queueLimit: 1,
        url: '/api/fileUpload/xml/'
    });

    $scope.xmlUploader.onAfterAddingFile = function(item, filter, options) {
        item.formData = [File.order];
    }


    $scope.pdfUploader = new FileUploader({
        queueLimit: 1,
        url: '/api/fileUpload/pdf/'
    });

    $scope.pdfUploader.onAfterAddingFile = function(item, filter, options) {
        item.formData = [File.order];
    }


})
