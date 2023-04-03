const form = document.querySelector("#form-login");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = {};

    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
    };

    console.log("opt:", options);

    fetch("/api/session/login", options) // * If valid, backend will redirect to /products
        .then((response) => console.log("resp: ", response));
    // .then(response => {
    //     console.log("resp:", response)
    //     if (response.ok) {
    //         window.location.href = '/products';
    //     } else {
    //         alert("Datos incorrectos")
    //     }
    // })
});
