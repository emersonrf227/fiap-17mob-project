var db;
var storage;

 
  var config = {
    apiKey: "AIzaSyDUKTSRGJ1niu8hqDEobRmNbbjXgz4hakM",
    authDomain: "radio-f7556.firebaseapp.com",
    databaseURL: "https://radio-f7556.firebaseio.com",
    projectId: "radio-f7556",
    storageBucket: "radio-f7556.appspot.com",
    messagingSenderId: "607843645174"
  };
  firebase.initializeApp(config);

    var app = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore(app);
    storage = firebase.storage();
    storageRef = storage.ref();



function logar(email, password, page) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function() {
            window.location = page;
        })
        .catch(function(error) {
            console.error(error);
            alert("Anderson " + error);
        });
}

function singin(name, phone, email, password, page) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function() {

            db.collection("APP_USER_DEFAULT").doc(firebase.auth().currentUser.uid).set({
                    id: firebase.auth().currentUser.uid,
                    name: name,
                    phone: phone,
                    email: email,
                    avatar: "",
                    create: new Date,
                    update: new Date
                })
                .then(function(docRef) {
                    window.location = page;
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(error);
                    // ...
                });
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(error);
            // ...
        });
}