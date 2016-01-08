rtfmApp.controller('loginCtrl', function($scope, $state, userSvc) {
  $scope.login = function(userObj) {
      userSvc.login(userObj);
  };
});
