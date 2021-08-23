// console.log(firebase.auth());
// console.log(firebase.database());

let login = () => {
    // Making Variables
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let message = document.getElementById("message");

    if ((email.value.includes("@gmail.com") || email.value.includes("@yahoo.com")) && password.value) {
        firebase.auth().signInWithEmailAndPassword(email.value, password.value)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                var uOrRUid = user.uid
                    // console.log(uOrRUid);
                    // ...
                firebase.database().ref(`UsersData/${uOrRUid}`).on("value", (data) => {
                    // console.log(data.val());
                    if (data.val().type === "user") {
                        message.innerText = `Welcome ${data.val().userName}`;
                        setTimeout(() => {
                            message.innerText = "";
                            location.href = "../../index.html"
                        }, 2000);

                    }
                })

                firebase.database().ref(`RestaurantsData/${uOrRUid}`).on("value", (data) => {
                    if (data.val().type === "restaurant") {
                        message.innerText = `Welcome ${data.val().restaurantName}`;
                        setTimeout(() => {
                            message.innerText = "";
                            location.href = "../../restaurant.html"
                        }, 2000);
                    }
                })
            })
            .catch((error) => {
                message.innerText = "Email and Password not found"
                setTimeout(() => {
                    message.innerText = ""
                }, 2000);
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    } else {
        message.innerText = "Invalid Credential"
        setTimeout(() => {
            message.innerText = ""
        }, 2000);
    }

}