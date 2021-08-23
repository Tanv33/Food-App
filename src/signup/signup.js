const signUp = () => {
    // Making variables  
    let userName = document.getElementById("userName");
    let email = document.getElementById("email");
    let phoneNumber = document.getElementById("phoneNumber");
    let country = document.getElementById("country");
    let city = document.getElementById("city");
    let password = document.getElementById("password");
    let message = document.getElementById("message");

    // Here is User signup  Object
    let obj = {
        userName: userName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        country: country.value,
        city: city.value,
        password: password.value,
        type: "user"
    }

    if (userName.value && phoneNumber.value && country.value && city.value && password.value != "" && (email.value.includes("@gmail.com") || email.value.includes("@yahoo.com"))) {

        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                var userUid = user.uid;
                // console.log(userUid);
                firebase.database().ref(`UsersData/${userUid}`).set(obj)
                    .then((res) => {
                        console.log(res);
                    }).catch((err) => {
                        console.log(err);
                    });
                message.innerHTML = "Successfully User Account Created ";
                setTimeout(() => {
                    message.innerHTML = "";
                    location.href = "../login/login.html"
                }, 2000);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    } else {
        message.innerHTML = "Invalid Credential";
        setTimeout(() => {
            message.innerHTML = "";
        }, 2000);

    }
}