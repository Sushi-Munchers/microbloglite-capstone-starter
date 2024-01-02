window.onload = () => {
    let registerUser = document.getElementById("registration");

    let usenameInputEl = document.getElementById("username");
    let fullNameInputEl = document.getElementById("fullName");
    let passWordInputEl = document.getElementById("password");

    registerUser.onsubmit = (e) => {
        e.preventDefault();

        let registrationData = {
            username : usenameInputEl.value,
            fullName : fullNameInputEl.value,
            password : passWordInputEl.value,
        };

        fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users", {
            method: "POST",
            headers: {
                "content-type": "application/JSON",
            },
            body: JSON.stringify(registrationData),
        })
            .then((res) => res.json())
            .then(() => {
                console.log("User registered successfully");
                window.location.assign("/");
            }).catch((err) => {
                console.error("Failed to register user", err);
            })
    }

}