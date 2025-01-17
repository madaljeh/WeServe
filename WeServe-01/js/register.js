const url = "https://localhost:44348/api/Register/register";
async function register() {
    debugger
  event.preventDefault();
  var form = document.getElementById("registerform");
  var formData = new FormData(form);
  var response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  // localStorage.setItem("EmployeeId", Id);

  if (response.ok) {
    Swal.fire({
      title: "Success!",
      text: "Registration successful",
      icon: "success",
      confirmButtonText: "OK",
      timer: 3000, // 3 seconds
      timerProgressBar: true, // Show a progress bar
    });

    // Redirect to the page after 3 seconds
    setTimeout(() => {
      window.location.href="../login.html"
    }, 2000);
  } else {
    Swal.fire({
      title: "Error!",
      text: "Registration failed",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}





const url2 = "https://localhost:44348/api/Register/register";
async function registerr() {
    debugger
  event.preventDefault();
  var form = document.getElementById("registerform2");
  var formData = new FormData(form);
  var response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  // localStorage.setItem("EmployeeId", Id);

  if (response.ok) {
    Swal.fire({
      title: "Success!",
      text: "Registration successful",
      icon: "success",
      confirmButtonText: "OK",
      timer: 3000, // 3 seconds
      timerProgressBar: true, // Show a progress bar
    });

    // Redirect to the page after 3 seconds
    setTimeout(() => {
      window.location.href="../login.html"
    }, 2000);
  } else {
    Swal.fire({
      title: "Error!",
      text: "Registration failed",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}




const Log_in = "https://localhost:44348/api/Register/login";
async function login() {
    debugger
  event.preventDefault();
  var data = {
    password: document.getElementById("password").value,
    emailaddress: document.getElementById("email").value,
  };

  var response = await fetch(Log_in, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    var result = await response.json();
    console.log(result);

    if (result.roleId != null && result.roleId === false) {
      localStorage.setItem("UserId", result.idPerson);
      Swal.fire({
        title: "Success!",
        text: "Logged in successfully.",
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
      }).then(() => {
        window.location.href = "../Customer.html";
      });
    
    } else if (result.roleId != null && result.roleId === true)  {
      localStorage.setItem("UserId", result.idPerson);
      Swal.fire({
        title: "Success!",
        text: "Logged in successfully.",
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
      }).then(() => {
        window.location.href = "../ServiceProvider.html";
      });
    }
  } else {
    var errorMessage;
    if (response.status === 404) {
      errorMessage = "Email not found.";
    } else if (response.status === 401) {
      errorMessage = "Invalid password.";
    } else {
      errorMessage = "Login failed.";
    }

    Swal.fire({
      title: "Error!",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "OK",
    });
  }
} 