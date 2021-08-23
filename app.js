let dashBoard = document.getElementById("dashBoard");
let search = document.getElementById("search");
let login = document.getElementById("login");
let signup = document.getElementById("signup");
let logout1 = document.getElementById("logout1");
logout1.style.display = "none";

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        logout1.style.display = "block"
        login.style.display = "none"
        signup.style.display = "none"
        var uid = user.uid;
        let html = ""
        firebase.database().ref(`dashboard`).on("child_added", (data) => {
            html += `<div class="card m-3" style="width: 25rem;">
            <img src="images/food.jpg" class="card-img-top" alt="...">
            <div class="card-body divTN">
                <h5 class="card-title">${data.val().itemName}</h5>
                <p class="card-text mb-1">${data.val().price} rupees</p>
                <p class="card-text mb-2">${data.val().category}</p>
                <button class="btn btn-success" onClick="order(this)">Order</button>
                <span class="float-end">Delivery: ${data.val().delivery}</span>
            </div>
            </div>`
            dashBoard.innerHTML = html;
        })
    } else {
        message.innerHTML = `Signup To See and Buy food...`
    }
});

const order = (e) => {
    e.disabled = "true"
    e.innerText = "Ordered"
}

const logout = () => {
    firebase.auth().signOut().then((res) => {
        message.innerHTML = ""
        message.innerHTML = "Good Bye!"
        setTimeout(() => {
            message.innerHTML = ""
            location.href = "src/login/login.html"
        }, 2000);
    }).catch((error) => {});
}

// Search bar
search.addEventListener("input", () => {
    let searchVal = search.value.toLowerCase();
    let divTN = document.getElementsByClassName("divTN");
    Array.from(divTN).forEach((element) => {
        element.children[0].innerText.toLowerCase().includes(searchVal) || element.children[1].innerText.toLowerCase().includes(searchVal) || element.children[2].innerText.toLowerCase().includes(searchVal) ? (element.parentElement.style.display = "block") : element.parentElement.style.display = "none";
    });
});