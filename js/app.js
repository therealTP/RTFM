var rtfmApp = angular.module('rtfmApp', ['ui.router', 'firebase']);

rtfmApp.constant('baseUrl', 'https://tp-realtimeforum.firebaseio.com/');

rtfmApp.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('allThreads', {
    url: '/allThreads',
    templateUrl: 'js/allThreads/allThreadsTmpl.html',
    controller: 'allThreadsCtrl',
    resolve: { // before going to route, finish whatever is in this object
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
      newTest: function() {
        return 'test';
      }
    }
  });

  $urlRouterProvider
  .otherwise('/allThreads');
}); // end of config
