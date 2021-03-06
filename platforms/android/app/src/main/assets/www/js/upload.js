var data;
var db;
var storage;
var storageRef;


db = firebase.firestore(app);
storage = firebase.storage();
storageRef = storage.ref();



function dadosUser(){

     
    name = document.getElementById("inputName").value;
    phone = document.getElementById("inputPhone").value;

    if(name == ''){
		alert('Campo nome em branco esta vazio'); 
        return false;}
        
    else if(phone == ''){
        alert('Campo telefone esta vazio'); 
        return false;}
    else{     


    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
        var uid = user.uid;
        uploadFirebase(user)
        } else {
          window.location = "login.html";
        }
      });

    }
    


}









function uploadFirebase(user) {

    var uid = user.uid;

    var image = document.getElementById("image").src;
    if (image.indexOf('base64') !== -1) {

        // File or Blob named mountains.jpg
        var filename = uid+"avatar.jpg"
        var file = dataURLtoFile(image, filename);

        // Create the file metadata
        var metadata = {
            contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child('images/' + filename).put(file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;
          }
      },
      function(error) {
          switch (error.code) {
              case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;
              case 'storage/canceled':
                  // User canceled the upload
                  break;
              case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  break;
          }
      },
      function() {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL);
              salvaDados(downloadURL, user);
          });
      });
} else {
 // saveBaseFirebase();
}
}


function salvaDados(downloadURL, user){

    
    
    
    name = document.getElementById("inputName").value;
    phone = document.getElementById("inputPhone").value;

    

    var id = user.uid;
    var avatar = "";
    if (data && data.avatar) {
    avatar = data.avatar;
    }
    if (downloadURL) {
    avatar = downloadURL;
}

db.collection("DadosUsers").doc(id).set({
    id: id,
    name: name,
    phone: phone,
    //email: email,
    avatar: avatar,
    //create: create,
    update: new Date
}).then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    window.location="dashboard.html";
})
.catch(function(error) {
    console.error("Error adding document: ", error);
    window.location="dashboard.html";
});




    }




function saveBaseFirebase(downloadURL) {
var name = $('#inputName').val();
var phone = $('#inputPhone').val();

var email = data.email;
var create = data.create;


}
function dataURLtoFile(dataurl, filename) {
var arr = dataurl.split(','),
  mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]),
  n = bstr.length,
  u8arr = new Uint8Array(n);
while (n--) {
  u8arr[n] = bstr.charCodeAt(n);
}
return new File([u8arr], filename, {
  type: mime
});
}

