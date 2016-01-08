rtfmApp.controller('signupCtrl', function($scope, $state, userSvc) {
  $scope.register = function(userObj) {
      userSvc.register(userObj);
  };
});
