function saveImagem() {
  
  // Create a root reference
var storageRef = firebase.storage().ref();




  var canvas = document.getElementById("image");

  ref.putString(canvas, 'data_url').then(function(snapshot) {
    console.log('Uploaded a data_url string!');
  });

};