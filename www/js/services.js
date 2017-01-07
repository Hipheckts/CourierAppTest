//TODO: move to different files
angular.module('starter.services', [])

.factory('FirebaseProvider', FirebaseProvider);

function FirebaseProvider($firebaseObject, $firebaseAuth, $firebaseArray) {

    var auth = $firebaseAuth();
    var users_database_ref = firebase.database().ref('users_database');
    //var device_id = '1234-test-8';
    var user_database_ref = null;
    var users_database = null;

    // login with google
    /*auth.$signInWithPopup("google").then(function(firebaseUser) {
        console.log("Signed in as:", firebaseUser.uid);
    }).catch(function(error) {
        console.log("Authentication failed:", error);
    });*/
    function init(device_id) {
        user_database_ref = firebase.database().ref('users_database/' + device_id);
        users_database = $firebaseObject(user_database_ref);
    }

    function signIn() {
        return auth.$signInAnonymously();
    }

    function signOut() {
        return auth.$signOut();
    }

    function isSignedIn() {
        return auth.$getAuth();
    }

    function addUserData(userData) {
        angular.extend(users_database, userData);
        users_database.$save().then(function(ref) {
            console.log("ok:", ref);
        }, function(error) {
            console.log("Error:", error);
        });
    }

    function getAllData() {
        return $firebaseObject(users_database_ref);
    }

    function removeUserData() {
        return users_database.$remove();
    }

    return {
        init: init,
        signIn: signIn,
        signOut: signOut,
        addUserData: addUserData,
        getAllData: getAllData,
        removeUserData: removeUserData,
        isSignedIn: isSignedIn
    }
}

FirebaseProvider.$inject = ['$firebaseObject', '$firebaseAuth', '$firebaseArray'];
