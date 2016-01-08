rtfmApp.service('threadsSvc', function($firebaseObject, $firebaseArray, baseUrl) {
  var threadsRef = new Firebase(baseUrl + '/threads');
  var allThreads = $firebaseArray(threadsRef);

  this.getAllThreads = function() {
    return allThreads;
  };

  this.getOneThread = function(threadId) {
    var oneThreadRef = new Firebase(baseUrl + '/threads/' + threadId);
    return $firebaseObject(oneThreadRef);
  };

  this.addThread = function(threadObj) {
    return allThreads.$add(threadObj); // return promise to do something with when resolved
  };

  this.removeThread = function(threadId) {
    var threadRef = new Firebase(baseUrl + '/threads/' + threadId);
    var threadObj = $firebaseObject(threadRef);
    return threadObj.$remove();
  };

  // Messages data - different service?
  this.getThreadMessages = function(threadId) {
    var msgRef = new Firebase(baseUrl + '/messages/' + threadId);
    var msgs = $firebaseArray(msgRef);
    return msgs;
  };

  this.addMessage = function(threadId, msgObj) {
    var msgRef = new Firebase(baseUrl + '/messages/' + threadId);
    var msgs = $firebaseArray(msgRef);
    return msgs.$add(msgObj);
  };
});
