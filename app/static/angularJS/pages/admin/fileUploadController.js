app.controller('fileUploadController', function($scope, FileUploader, File) {

    $scope.uploaderDone = false;
    $scope.uploader = new FileUploader({
        queueLimit: 2,
        url: '/api/fileUpload/files/'
    });
    $('#fileModal').on("hidden.bs.modal", function() {
        $scope.uploader.clearQueue();
        $scope.uploaderDone = false;
    })
    $scope.uploader.onAfterAddingFile = function(item, filter, options) {
        item.formData = [File.order];
        if(  $scope.uploader.queue.length>1){
          if(item.file.type == "application/pdf"){
             var temp = $scope.uploader.queue[0];
             $scope.uploader.queue[0] = $scope.uploader.queue[1];
             $scope.uploader.queue[1] = temp;
          }
        }
    }

    $scope.uploader.onCompleteAll = function() {
        $scope.uploaderDone = true;
    }
    $scope.closeModal = function() {
        $('#fileModal').modal('hide')
    }

})
