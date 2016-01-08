var rtfmApp = angular.module('rtfmApp', ['ui.router', 'firebase']);

rtfmApp.constant('baseUrl', 'https://tp-realtimeforum.firebaseio.com/');

// for use in resolve methods on restricted routes, could be part of factory
var authFunc = function(userSvc, $firebaseAuth) { // anytime going to this route, check auth
  var auth = userSvc.getAuth();
  return auth.$requireAuth(); // returns current auth state, not authObj
};

rtfmApp.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('allThreads', {
    url: '/allThreads',
    templateUrl: 'js/allThreads/allThreadsTmpl.html',
    controller: 'allThreadsCtrl',
    resolve: { // before going to route, finish whatever is in this object
      auth: authFunc,
      threads: function(threadsSvc) {
        return threadsSvc.getAllThreads();
      }
    }
  })
  .state('thread', {
    url: '/thread/:id',
    templateUrl: 'js/thread/threadTmpl.html',
    controller: 'threadCtrl',
    resolve: {
      auth: authFunc
    }
  })
  .state('login', {
    url: '/login',
    templateUrl: 'js/login/loginTmpl.html',
    controller: 'loginCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'js/signup/signupTmpl.html',
    controller: 'signupCtrl'
  });

  $urlRouterProvider
  .otherwise('/login');
}); // end of config
