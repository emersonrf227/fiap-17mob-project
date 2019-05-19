firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        alert(user.uid);
    } else {
      window.location = "login.html";
    }
  });

  function Logout() {
    firebase.auth().signOut()
      .then(function () {
        console.log('Logout');
        window.location = "login.html";
      }, function (error) {
        console.error(error);
        
      });

  }