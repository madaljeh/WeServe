document.addEventListener("DOMContentLoaded", () => {
    const loggedInEmail = localStorage.getItem("loggedInEmail");
  
    if (!login()) {
      alert("Please log in to view your profile.");
      window.location.href = "/login.html";
      return;
    }
  
    fetch("https://localhost:44348/api/Register/getallusers", {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }
        return response.json();
      })
      .then(users => {
        const user = users.find(u => u.emailaddress.toLowerCase() === loggedInEmail.toLowerCase());
  
        if (user) {
          document.getElementById("userName").textContent = user.userName || "N/A";
          document.getElementById("firstName").textContent = user.fisrtName || "N/A";
          document.getElementById("lastName").textContent = user.lastName || "N/A";
          document.getElementById("city").textContent = user.city || "N/A";
          document.getElementById("gender").textContent = user.gender || "N/A";
          document.getElementById("phone").textContent = user.phone || "N/A";
          document.getElementById("email").textContent = user.emailaddress || "N/A";
        } else {
          alert("User data not found.");
        }
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        alert("An error occurred while fetching user data.");
      });
  });
  