var data;
var db;
var storage;
var storageRef;


db = firebase.firestore(app);
storage = firebase.storage();
storageRef = storage.ref();




firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
    var uid = user.uid;
    findByUser(user)
    } else {
      window.location = "login.html";
    }
  });

function findByUser(user) {

    var id = user.uid;

    var img = document.getElementById("photoPerfil");
 


    var docRef = db.collection("DadosUsers").doc(id);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
           avatar = (doc.data().avatar);

           if (avatar != null){

            img.src = avatar;


           }


        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    


}