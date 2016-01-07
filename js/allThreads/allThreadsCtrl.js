rtfmApp.controller('allThreadsCtrl', function($scope, threadsSvc, threads) {
  $scope.test = 'Threads CTRL connected.';
  $scope.threads = threads;
  $scope.newThread = {};
  $scope.addNewThread = function(threadObj) {
    threadsSvc.addThread(threadObj)
    .then(
      function(response) {
        console.log("thread added successfully.");
        $scope.newThread = {};
      }
    );
  };
});
