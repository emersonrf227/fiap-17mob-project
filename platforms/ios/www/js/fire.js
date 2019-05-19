function saveUser(email, name, phone) {
    firebase.collection("APP_USER_DEFAULT").add({
        id: firebase.auth().currentUser.uid,
        name: name,
        phone: phone,
        email: email,
        create: new Date,
        update: new Date
    })
        .then(function (docRef) {
            alert("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            alert("Error writing document: ", error);
        });
}