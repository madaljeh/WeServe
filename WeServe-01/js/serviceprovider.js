const url = "https://localhost:44348/api/AddService/createservice";

async function newservice(event) {
    debugger
//   event.preventDefault(); 

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
      })
    } else {
      // التعامل مع الأخطاء بناءً على حالة الاستجابة
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
    // التعامل مع الأخطاء العامة (مثل مشاكل الشبكة)
    console.error("Error while adding the service:", error);
    Swal.fire({
      title: "Error!",
      text: "An unexpected error occurred. Please try again later.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}
