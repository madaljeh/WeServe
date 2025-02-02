document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting the default way

  
  const formData = {
    id: 0, 
    fullname: document.getElementById('fullname').value.trim(),
    email: document.getElementById('email').value.trim(),
    phonenumber: document.getElementById('phonenumber').value.trim(),
    massage: document.getElementById('massage').value.trim(),
  };

  // Validate form data (optional but recommended)
  if (!formData.fullname || !formData.email || !formData.phonenumber || !formData.massage) {
    Swal.fire({
      title: "Error!",
      text: "Please fill out all fields before submitting.",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

  // Send data to the API
  fetch('https://localhost:44348/api/Contactu/createcontact', {
    method: 'POST',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
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
        text: "Thank you for getting in touch! Your message has been sent.",
        icon: "success",
        confirmButtonText: "OK",
        timer: 3000, // 3 seconds
        timerProgressBar: true,
      });

      // Reset the form after successful submission
      document.getElementById('contactForm').reset();
    })
    .catch(error => {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while sending your message. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error('Error:', error);
    });
});
