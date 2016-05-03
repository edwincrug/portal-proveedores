app.controller('fileUploadController', function($scope ,FileUploader,File) {

    $scope.uploader = new FileUploader({
        queueLimit: 2,
        url: '/api/fileUpload/files/'
    });

    $scope.uploader.onAfterAddingFile = function(item, filter, options) {
        item.formData = [File.order];
    }


  
})
