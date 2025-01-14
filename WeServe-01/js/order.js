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
            <td>${booking.contactName || "N/A"}</td>
            <td>${booking.service}</td>
            <td>${booking.phone || "N/A"}</td>
            <td>${booking.detailsProblem}</td>
            <td>${booking.status ? "Approved" : "Pending"}</td>
            <td>
              <button class="btn approve" onclick="approveBooking(${booking.bookingServiceId})">Approve</button>
              <button class="btn reject" onclick="rejectBooking(${booking.bookingServiceId})">Reject</button>
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
  
  // Add placeholder functions for Approve and Reject actions
  function approveBooking(bookingId) {
    console.log("Approve booking with ID:", bookingId);
    // Implement API call to approve the booking
  }
  
  function rejectBooking(bookingId) {
    console.log("Reject booking with ID:", bookingId);
    // Implement API call to reject the booking
  }
  