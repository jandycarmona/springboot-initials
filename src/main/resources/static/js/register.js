$(document).ready(function() {
    //on ready
});

async function registerUser(){

    let data = {}
    data.name = document.getElementById('txtFirstName').value;
    data.lastname = document.getElementById('txtLastName').value;
    data.email = document.getElementById('txtEmail').value;
    data.password = document.getElementById('txtPassword').value;

    let repeatPassword = document.getElementById('txtRepeatPassword').value;

    if(data.password != repeatPassword){
        alert("The passwords doesn't match");
        return;
    }

    const request = await fetch('api/users', {
        method: 'POST',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    alert("Account successfully created!");

    window.location.href = "login.html";
}
