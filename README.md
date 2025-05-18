# 🏠 WeServe - House Services Booking Platform

A simple yet powerful web platform designed to connect customers with service providers for house services like plumbing, electrical work, cleaning, painting, and more. Users can register, log in, browse services, select a provider, book appointments, manage their profiles, and view order history.

### 🛠️ Features

- **Customer Booking System**: Customers can easily book services by selecting providers, specifying dates, and detailing their issues.
- **Service Provider Management**: Providers can manage their profile, add or remove services, and view customer bookings.
- **User Authentication**: Secure login and registration system for both customers and service providers.
- **Contact Us Form**: A dedicated form for users to send messages directly to the admin.
- **Responsive UI**: Fully responsive design using modern HTML and CSS.
- **SweetAlert2 Integration**: Enhanced user experience with pop-up alerts.
- **Dynamic Data Handling**: Uses JavaScript fetch API to communicate with backend services.

---

### 🧩 Technologies Used

- **Frontend**:
  - HTML5
  - CSS3 (with custom animations and responsive layout)
  - JavaScript
  - SweetAlert2 for interactive alerts
  - Font Awesome for icons

- **Backend**:
  - ASP.NET Core Web API
  - Entity Framework for database operations
  - SQL Server for data storage



### 🔧 How to Run

1. Clone the repository.
2. Ensure you have:
   - .NET SDK installed
   - SQL Server running
   - Backend API configured
3. Open `Home.html` in your browser to start exploring.

---

### 📈 Future Enhancements

- Add support for multi-language content.
- Implement Google Maps integration for location-based service search.
- Enable real-time chat between customers and service providers.
- Add rating and review system for providers.

---


## 🌐 APIs Used

The frontend interacts with a backend API hosted at:
```
https://localhost:44348/api/
```

Some endpoints used:
| Endpoint | Description |
|---------|-------------|
| `/Register/register` | Registers a new user |
| `/Register/login` | Authenticates a user |
| `/AddService/createservice` | Adds a new service (by provider) |
| `/BookingService/createbooking` | Creates a booking |
| `/BookingService/getbookingsbyuserid/{id}` | Retrieves user bookings |
| `/Contactu/createcontact` | Saves contact form messages |

> Note: Ensure the backend is running on port `44348` and CORS is enabled.


### ❤️ Credits
Special thanks to [Font Awesome](https://fontawesome.com/) and [SweetAlert2](https://sweetalert2.github.io/).


---

## 👥 Contact

Ahmad Madaljeh  
📧 Email: ahmadmadaljeh@gmail.com  
