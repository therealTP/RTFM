rtfmApp.controller('allThreadsCtrl', function($scope, $state, $firebaseAuth, threadsSvc, auth, threads, userSvc) {
  $scope.authData = auth;
  console.log('UID', $scope.authData.uid);

  $scope.logout = function() {
    userSvc.logout();
  };

  // get current user object from user id
  userSvc.getUser($scope.authData.uid)
  .then(
    function(response) {
      $scope.currUser = response.email;
      localStorage.currUser = $scope.currUser;
    }
  );

  $scope.threads = threads;
  $scope.newThread = {};
  $scope.addNewThread = function(threadObj) {
    threadObj.owner = $scope.currUser;
    threadsSvc.addThread(threadObj)
    .then(
      function(response) {
        console.log("thread added successfully.");
        $scope.newThread = {};
      }
    );
  };
});
