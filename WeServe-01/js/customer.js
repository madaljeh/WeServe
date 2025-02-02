// Fetch services and populate the dropdowns
fetch('https://localhost:44348/api/Register/getallusersinfo', {
  method: 'GET',
  headers: {
    'Accept': '*/*',
  },
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Extract unique service names
    const serviceNames = [...new Set(data.map(user => user.servicename).filter(name => name !== null))];

    // Get the dropdown elements
    const chooseServiceDropdown = document.getElementById('choose-service');
    const chooseProviderDropdown = document.getElementById('choose-provider');

    // Populate the "Choose Services" dropdown with service names
    serviceNames.forEach(serviceName => {
      const option = document.createElement('option');
      option.value = serviceName;
      option.textContent = serviceName;
      chooseServiceDropdown.appendChild(option);
    });

    // Add event listener to update "Choose Provider" dropdown based on selected service
    chooseServiceDropdown.addEventListener('change', function () {
      const selectedService = this.value;

      // Clear the current options in "Choose Provider"
      chooseProviderDropdown.innerHTML = '<option value="">Choose...</option>';

      // Filter users by the selected service name
      const filteredUsers = data.filter(user => user.servicename === selectedService);

      // Populate the "Choose Provider" dropdown with filtered users
      filteredUsers.forEach(user => {
        const providerName = user.serviceprovider.trim();
        const priceperhour = user.priceperhour; 
        if (providerName) {
          const option = document.createElement('option');
          option.value = user.serviceid; 
          option.textContent = `${providerName} - $${priceperhour}/hour`; 
          option.dataset.price = priceperhour; 
          chooseProviderDropdown.appendChild(option);
        }
      });
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Handle form submission for booking
document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Collect data from the form
  const service = document.getElementById('choose-service').value;
  const providerId = document.getElementById('choose-provider').value;
  const bookingDate = document.getElementById('booking-date').value;
  const bookingTime = document.getElementById('booking-time').value;
  const details = document.getElementById('details').value;

  // Combine date and time into a single ISO string
  const date = new Date(`${bookingDate}T${bookingTime}`).toISOString();

  // Validate inputs
  if (!service || !providerId || !bookingDate || !bookingTime || !details) {
    Swal.fire({
      title: "Error!",
      text: "Please fill out all required fields.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

  // Prepare data for the API
  const bookingData = {
    bookingServiceId: 0, 
    service: service,
    date: date,
    detailsProblem: details,
    status: true, 
    userId: localStorage.getItem("UserId"), 
    serviceId: parseInt(providerId), 
  };

  // Send the booking data to the API
  fetch('https://localhost:44348/api/Booking/submitbooking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      Swal.fire({
        title: "Success!",
        text: "Your booking has been submitted.",
        icon: "success",
        confirmButtonText: "OK",
      });
    })
    .catch(error => {
      console.error('Error submitting booking:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to submit booking. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    });



  // Send the booking data to the API
  fetch('https://localhost:44348/api/BookingService/createbooking', {
    method: 'POST',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      Swal.fire({
        title: "Success!",
        text: "Your booking was successfully submitted.",
        icon: "success",
        confirmButtonText: "OK",
      });
      console.log('Booking Successful:', data);

      // Reset the form
      document.querySelector('form').reset();
    })
    .catch(error => {
      Swal.fire({
        title: "Error!",
        text: `There was an issue with your booking. ${error.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error('Booking Error:', error);
    });
});




