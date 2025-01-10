async function getalldata() {

    
    var userId = localStorage.getItem("UserId");
    debugger
    var urlemployee =` https://localhost:44348/api/Register/getallusers/${userId}`;
    var response = await fetch(urlemployee);
    if (!response.ok) {
      console.error("Failed to fetch data:", response.statusText);
      return;
    }

    var data = await response.json();
    var contaner = document.getElementById("Info");
    contaner.innerHTML = ""; 
    
    data.forEach((product) => {
        contaner.innerHTML += `
        <p><strong>User Name:</strong> <span>${product.userName}</span></p>
        <p><strong>First Name:</strong> <span>${product.fisrtName}</span></p>
        <p><strong>Last Name:</strong> <span>${product.lastName}</span></p>
        <p><strong>City:</strong> <span></span>${product.city}</p>
        <p><strong>Gender:</strong> <span>${product.gender}</span></p>
        <p><strong>Phone:</strong> <span>${product.phone}</span></p>
        <p><strong>Email:</strong> <span>${product.emailaddress}</span></p>
      `;
    });}
getalldata();





async function getalldataserviceprovider() {

    
    var userId = localStorage.getItem("UserId");
    debugger
    var urlemployee =` https://localhost:44348/api/Register/getallusers/${userId}`;
    var response = await fetch(urlemployee);
    if (!response.ok) {
      console.error("Failed to fetch data:", response.statusText);
      return;
    }

    var data = await response.json();
    var contaner = document.getElementById("Infoservicprovider");
    contaner.innerHTML = "";  
  
    data.forEach((product) => {
        contaner.innerHTML += `
        <p><strong>User Name:</strong> <span>${product.userName}</span></p>
        <p><strong>First Name:</strong> <span>${product.fisrtName}</span></p>
        <p><strong>Last Name:</strong> <span>${product.lastName}</span></p>
        <p><strong>City:</strong> <span></span>${product.city}</p>
        <p><strong>Gender:</strong> <span>${product.gender}</span></p>
        <p><strong>Phone:</strong> <span>${product.phone}</span></p>
        <p><strong>Email:</strong> <span>${product.emailaddress}</span></p>
        <p><strong>Service Provider:</strong>${product.jobTitle} </p>
        <p><strong>Price per Hour:</strong>${product.pricePerHour} JOD </p>
        <p><strong>Experience:</strong>${product.experience} </p>


      `;
    });}


  getalldataserviceprovider();