async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Por favor, ingresa ambos campos.");
        return;
    }

    try {
        const response = await fetch("http://localhost:8000/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            const user = data.user;

            localStorage.setItem("authToken", token);

            if (user.role === 1) { 
                window.location.href = "dashboard1.html";
            } else if (user.role === 2) { 
                window.location.href = "dashboard2.html";
            } else {
                alert("Rol de usuario no reconocido.");
            }
        } else {
            const errorData = await response.json();
            alert(errorData.detail || "Correo o contraseña incorrectos.");
        }
    } catch (error) {
        console.error("Error al hacer login:", error);
        alert("Hubo un problema al procesar la solicitud. Inténtalo de nuevo más tarde.");
    }
}
