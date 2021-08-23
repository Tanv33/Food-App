// Varialbles Globally
let itemName = document.getElementById("itemName");
let price = document.getElementById("price");
let message = document.getElementById("message")
let div = document.getElementById("div");
let dropDown = document.getElementById("dropDown");
dropDown.value = "Pakistani";
let html = "";
let pending = document.getElementById("pending")
let accepted = document.getElementById("accepted")
let delivered = document.getElementById("delivered")

function changeCategory() {
    return dropDown.value
}

const post = () => {

    let foodObj = {
        itemName: itemName.value,
        price: price.value,
        category: changeCategory(),
        delivery: "Free",
    }

    if (itemName.value && price.value !== "") {
        firebase.auth().onAuthStateChanged((user) => {
            firebase.database().ref(`posts/${user.uid}`).push().set(foodObj)
        });
    } else {
        message.innerHTML = "Fill requirements carefully"
        setTimeout(() => {
            message.innerHTML = ""
        }, 2000);

    }

    if (itemName.value && price.value !== "") {
        firebase.auth().onAuthStateChanged((user) => {
            foodObj.admin = user.email;
            firebase.database().ref(`dashboard`).push().set(foodObj)
        });
    } else {
        message.innerHTML = "Fill requirements carefully"
        setTimeout(() => {
            message.innerHTML = ""
        }, 2000);
    }

    itemName.value = "";
    price.value = "";
}

firebase.auth().onAuthStateChanged((user) => {
    firebase.database().ref(`posts/${user.uid}`).on("child_added", (data) => {
        html += `<div class="card m-3" style="width: 25rem;">
        <img src="images/food.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.val().itemName}</h5>
            <p class="card-text mb-1">${data.val().price} rupees</p>
            <p class="card-text mb-2">${data.val().category}</p>
            <button class="btn btn-success" onClick="order()">Order</button>
            <span class="float-end">Delivery: ${data.val().delivery}</span>
        </div>
        </div>`
        div.innerHTML = html;
    })
});

const logout = () => {
    firebase.auth().signOut().then((res) => {
        message.innerHTML = "Good Bye!"
        setTimeout(() => {
            message.innerHTML = ""
            location.href = "src/login/login.html"
        }, 2000);
    }).catch((error) => {});
}

const pending1 = (params) => {
    pending.innerHTML = ""
    accepted.innerHTML = `<li ><a class = "dropdown-item"role = "button" onclick = "accepted1()">Biryani Order</a></li>`
}
const accepted1 = () => {
    accepted.innerHTML = ""
    delivered.innerHTML = `<li ><a class = "dropdown-item"role = "button">Biryani Order</a></li>`
}