const url = "https://localhost:44348/api/AddService/createservice";

async function newservice(event) {
  debugger
  // event.preventDefault(); // Uncomment if this is used within a form submission

  const data = {
    serviceProviderName: document.getElementById("serviceProviderName").value,
    userId: localStorage.getItem("UserId"),
    priceperhour: document.getElementById("priceperhour").value,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);

      Swal.fire({
        title: "Success!",
        text: "The service has been added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Delay the reload for 3 seconds (3000ms)
      setTimeout(() => {
        location.reload();
      }, 1500);
    } else {
      // Handle errors based on the response status
      let errorMessage;
      switch (response.status) {
        case 404:
          errorMessage = "Service not found.";
          break;
        case 401:
          errorMessage = "Unauthorized access.";
          break;
        default:
          errorMessage = "Failed to add the service.";
      }

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  } catch (error) {
    // General error handling (like network issues)
    console.error("Error while adding the service:", error);
    Swal.fire({
      title: "Error!",
      text: "An unexpected error occurred. Please try again later.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}


async function getalldata() {

    

    var userId = localStorage.getItem("UserId");
    debugger
    var urlemployee =` https://localhost:44348/api/AddService/getallservicebyuserID/${userId}`;
    var response = await fetch(urlemployee);
    if (!response.ok) {
      console.error("Failed to fetch data:", response.statusText);
      return;
    }
  
    var data = await response.json();
    var contaner = document.getElementById("Infoserv");
    contaner.innerHTML = ""; 
    
    data.forEach((product) => {
        contaner.innerHTML += `
              <tr>
                <td>${product.serviceProvidername}</td>
                <td>${product.priceperhour}</td>
                <td>
                  <button class="btn approve">Edite</button>
                  <button class="btn reject"  onclick="deleteservices(${product.serviceid})">Delete</button>
                </td>
              </tr>
      `;
    });}
  getalldata();
  

  
  async function deleteservices(id) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This service will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      var delet = `https://localhost:44348/api/AddService/deleteservice/${id}`;
      var response = await fetch(delet, {
        method: "DELETE",
      });
      console.log("Response Status:", response.status);
      console.log("Response OK:", response.ok);
      if (response.ok) {
        await Swal.fire(
          "Deleted!",
          "The service has been deleted successfully.",
          "success"
        );
        location.reload();
      } else {
        const errorMessage = await response.text();
        await Swal.fire(
          "Error!",
          `There was an error deleting the service: ${errorMessage}`,
          "error"
        );
      }
    }
  }