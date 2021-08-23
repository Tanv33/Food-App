const restaurantSignUp = () => {
    // Making variables
    let restaurantName = document.getElementById("restaurantName");
    let email = document.getElementById("email");
    let country = document.getElementById("country");
    let city = document.getElementById("city");
    let password = document.getElementById("password");
    let message = document.getElementById("message");

    // Here is Restaurant signup Object
    let obj = {
        restaurantName: restaurantName.value,
        email: email.value,
        country: country.value,
        city: city.value,
        password: password.value,
        type: "restaurant"
    }

    if (restaurantName.value && country.value && city.value && password.value != "" && (email.value.includes("@gmail.com") || email.value.includes("@yahoo.com"))) {
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                var userUid = user.uid;
                // console.log(userUid);
                firebase.database().ref(`RestaurantsData/${userUid}`).set(obj)
                    .then((res) => {
                        console.log(res);
                    }).catch((err) => {
                        console.log(err);
                    });
                message.innerHTML = "Successfully Restaurant Account Created ";
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