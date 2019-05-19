var data;
var db;
var storage;
var storageRef;


db = firebase.firestore(app);
storage = firebase.storage();
storageRef = storage.ref();



function dadosUser(){

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
        var uid = user.uid;
        uploadFirebase(user)
        } else {
          window.location = "login.html";
        }
      });

      
    


}







function findByUser(id) {
    var docRef = db.collection("APP_USER_DEFAULT").doc(id);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            $('#inputEmail').val(doc.data().email);
            $('#inputName').val(doc.data().name);
            $('#inputPhone').val(doc.data().phone);
            if (doc.data().avatar) {
                $('#image').attr('src', doc.data().avatar);
            }
            data = doc.data();
        } else {
            console.log("No such document!");
        }
        waitingDialog.hide();
    }).catch(function (error) {
        waitingDialog.hide();
        console.log("Error getting document:", error);
    });
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
            function (snapshot) {
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

            function (error) {
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

            /*
            function() {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);
                    saveBaseFirebase(downloadURL);
                });
            }
            */
            console.log('Deu certo')
        );
    } else {
        // saveBaseFirebase();
    }





} 
    
   



function saveBaseFirebase(downloadURL) {
    var name = $('#inputName').val();
    var phone = $('#inputPhone').val();
    var id = data.id;
    var email = data.email;
    var create = data.create;
    var avatar = "";
    if (data && data.avatar) {
        avatar = data.avatar;
    }
    if (downloadURL) {
        avatar = downloadURL;
    }
    db.collection("APP_USER_DEFAULT").doc(id).set({
        id: id,
        name: name,
        phone: phone,
        email: email,
        avatar: avatar,
        create: create,
        update: new Date
    })
        .then(function (docRef) {
            waitingDialog.hide();
            console.log("Document ok update");
        })
        .catch(function (error) {
            waitingDialog.hide();
            console.log("Error writing document: ", error);
        });
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