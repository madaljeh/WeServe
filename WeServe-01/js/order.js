async function fetchBookings() {
    debugger
    const id=localStorage.getItem("UserId")
    const url = `https://localhost:44348/api/BookingService/getbooking/${id}`;
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "accept": "*/*",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const bookings = await response.json();
  
      // Get the table body element
      const tableBody = document.createElement("tbody");
  
      // Populate the table with booking data
      bookings.forEach((booking) => {
        const bookingDate = new Date(booking.date);
        const formattedDate = bookingDate.toISOString().split("T")[0];
        const formattedTime = bookingDate.toTimeString().split(" ")[0];
  
        const row = `
          <tr>
            <td>${formattedDate}</td>
            <td>${formattedTime}</td>
            <td>${booking.username || "N/A"}</td>
            <td>${booking.service}</td>
            <td>${booking.phone || "N/A"}</td>
            <td>${booking.detailsProblem}</td>
            <td>${booking.emailaddress}</td>
            <td>${booking.city}</td>
            <td>${booking.status ? "Pending" : "Approved"}</td>
            <td>
              <button class="btn reject" onclick="deletebooking(${booking.bookingServiceId})">DELETE</button>
            </td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
  
      // Append the table body to the table
      const table = document.querySelector(".order-section table");
      if (table.querySelector("tbody")) {
        table.removeChild(table.querySelector("tbody")); // Remove the old tbody if it exists
      }
      table.appendChild(tableBody);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  }
  
  // Call the function to fetch and display bookings
  fetchBookings();
  


  async function deletebooking(id) {
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
      var delet = `https://localhost:44348/api/BookingService/deletebooking/${id}`;
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


  // Add placeholder functions for Approve and Reject actions
  function approveBooking(bookingId) {
    console.log("Approve booking with ID:", bookingId);
    // Implement API call to approve the booking
  }
  
  function rejectBooking(bookingId) {
    console.log("Reject booking with ID:", bookingId);
    // Implement API call to reject the booking
  }
  




