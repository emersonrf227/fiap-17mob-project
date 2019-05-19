var app = {
    initialize: function() {
        document.addEventListener('deviceready', () => {
            console.log(navigator.camera);
        }, false);
    }
};

document.getElementById('camera').addEventListener('click', () => {
    let options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        targetWidth: 720,
        correctOrientation: true
    }

    takePicture(options)
})

document.getElementById('gallery').addEventListener('click', () => {
    let options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        targetWidth: 400,
        targetHeigth: 400,
        correctOrientation: true,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    }

    takePicture(options)
})

var takePicture = (options) => {
    navigator.camera.getPicture((image_data) => {

        var image = document.getElementById('image');
        image.src = "data:image/jpeg;base64," + image_data;
    }, 
    (error) => {
        console.log(error)
    }, options)
}

app.initialize();



  // Initialize Firebase
  // TODO: Replace with your project's customized code snippet
  var config = {
    apiKey: "AIzaSyDUKTSRGJ1niu8hqDEobRmNbbjXgz4hakM",
    authDomain: "radio-f7556.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
  };
  firebase.initializeApp(config);
