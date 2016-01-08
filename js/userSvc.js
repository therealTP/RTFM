rtfmApp.service('userSvc', function($firebaseObject, $firebaseAuth, $state, baseUrl) {
  var ref = new Firebase(baseUrl);
  var auth = $firebaseAuth(ref);

  // get user obj by uid
  this.getUser = function(uid) {
    var ref = new Firebase(baseUrl + '/users/' + uid);
    var userObj = $firebaseObject(ref);
    return userObj.$loaded();
  };

  this.login = function(userObj) {
    auth.$authWithPassword(userObj)
    .then(
      function(response) {
        $state.go('allThreads');
      },
      function(err) {
        console.log('Error: ', err);
      }
    );
  };

  // get current auth object
  this.getAuth = function() {
    return $firebaseAuth(ref);
  };

  // log out of app
  this.logout = function() {
    $firebaseAuth(ref).$unauth();
    $state.go('login');
    console.log('user logged out!');
  };

  // addUser function to add user obj to own fb data, private, not part of service constructor
  var addUser = function(uid, userEmail) { // takes in user obj w/ email
    var usersRef = new Firebase(baseUrl + '/users/' + uid);
    var userObj = $firebaseObject(usersRef);
    userObj.email = userEmail;
    userObj.$save()
    .then(
      function(response) {
        console.log('User obj added to own data successfully!');
      }
    );
  };

  this.register = function(userObj) {
    auth.$createUser(userObj) // create user in firebase auth system
    .then( // after new user added to auth
      function(response) {
        addUser(response.uid, userObj.email);
        alert("Success! Please login.");
        $state.go('login');
      },
      function(err) {
        // console.log(err);
        alert("Error! code of: " + err.code);
      }
    );
  };
});
