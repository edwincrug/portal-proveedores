app.controller('fileUploadController', function($scope, FileUploader, File) {

    $scope.uploaderDone = false;
    $scope.uploader = new FileUploader({
        queueLimit: 2,
        url: '/api/fileUpload/files/'
    });

    $scope.uploader.onAfterAddingFile = function(item, filter, options) {
        item.formData = [File.order];
    }

    $scope.uploader.onCompleteAll = function() {
        $scope.uploaderDone = true;
    }
    $scope.closeModal = function() {
        $('#fileModal').modal('hide')
        $scope.uploader.clearQueue();
        $scope.uploaderDone = false;
    }

})
