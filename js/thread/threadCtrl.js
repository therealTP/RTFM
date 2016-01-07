rtfmApp.controller('threadCtrl', function($scope, $state, $stateParams, threadsSvc) {
  $scope.test = "ThreadCTRL connected.";
  $scope.id = $stateParams.id;
  $scope.threadDetails = threadsSvc.getOneThread($scope.id);
  $scope.threadMessages = threadsSvc.getThreadMessages($scope.id);
  $scope.deleteThread = function(threadId) {
    threadsSvc.removeThread(threadId)
    .then(
      function(response) {
        $state.go('allThreads');
      }
    );
  };

  $scope.newMsg = {}; // blank for now
  $scope.addMessage = function(threadId, msgObj) {
    msgObj.timestamp = new Date().toString(); // add timestamp to object
    threadsSvc.addMessage(threadId, msgObj)
    .then(
      function(response) {
        console.log('Message added!');
        $scope.newMsg = {}; // clear after msg added
      }
    );
  };
});
