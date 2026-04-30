fetch("http://localhost:3002/login_user", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        email: "test@example.com",
        password: "Password123!"
    })
}).then(async res => {
    console.log("Status:", res.status);
    console.log("Response:", await res.json());
}).catch(console.error);
