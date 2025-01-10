// Fetch data from the API and handle both dropdowns
fetch('https://localhost:44348/api/Register/getallusers', {
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
      // Extract unique job titles
      const jobTitles = [...new Set(data.map(user => user.jobTitle).filter(title => title !== null))];
  
      // Get the dropdown elements
      const chooseServiceDropdown = document.getElementById('choose-service');
      const chooseProviderDropdown = document.getElementById('choose-provider');
  
      // Populate the "Choose Services" dropdown with job titles
      jobTitles.forEach(title => {
        const option = document.createElement('option');
        option.value = title;
        option.textContent = title;
        chooseServiceDropdown.appendChild(option);
      });
  
      // Add event listener to update "Choose Provider" dropdown based on selected service
      chooseServiceDropdown.addEventListener('change', function () {
        const selectedJobTitle = this.value;
  
        // Clear the current options in "Choose Provider"
        chooseProviderDropdown.innerHTML = '<option value="">Choose...</option>';
  
        // Filter users by the selected job title
        const filteredUsers = data.filter(user => user.jobTitle === selectedJobTitle);
  
        // Populate the "Choose Provider" dropdown with filtered users
        filteredUsers.forEach(user => {
          const fullName = `${user.fisrtName} ${user.lastName}`.trim();
          if (fullName) {
            const option = document.createElement('option');
            option.value = user.idPerson; // Set the idPerson as the value
            option.textContent = fullName; // Display the full name
            chooseProviderDropdown.appendChild(option);
          }
        });
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  


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
          bookingServiceId: 0, // Assume this is generated by the server
          service: service,
          date: date,
          detailsProblem: details,
          status: true, // Default status for new bookings
          userId: parseInt(providerId), // Provider's ID as the user ID
          serviceId: 2, // Adjust serviceId based on your specific logic
        };
      
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
              text: "There was an issue with your booking. Please try again.",
              icon: "error",
              confirmButtonText: "OK",
            });
            console.error('Booking Error:', error);
          });
      });
      