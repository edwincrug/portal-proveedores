app.controller('fileUploadController', function($scope, FileUploader) {
    $scope.xmlUploader = new FileUploader({queueLimit:1});
    $scope.pdfUploader = new FileUploader({queueLimit:1});

})
