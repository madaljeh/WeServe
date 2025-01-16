using Microsoft.AspNetCore.Mvc;
using WeServe.DTO;
using WeServe.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace WeServe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingServiceController : ControllerBase
    {
        private readonly MyDbContext _db;

        public BookingServiceController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("getallbookings")]
        public IActionResult GetAllBookings()
        {
            var bookings = _db.BookingServices.Select(b => new BookingServiceDTO
            {
                BookingServiceId = b.BookingServiceId,
                Service = b.Service,
                Date = b.Date,
                DetailsProblem = b.DetailsProblem,
                Status = b.Status,
                UserId = b.Userid,
                ServiceId = b.Serviceid
            }).ToList();

            return Ok(bookings);
        }

        [HttpPost("createbooking")]
        public IActionResult CreateBooking([FromBody] BookingServiceDTO dto)
        {
            if (dto == null)
                return BadRequest("Invalid booking data.");

            // Validate ServiceId
            var serviceExists = _db.Services.Any(s => s.Serviceid == dto.ServiceId);
            if (!serviceExists)
                return BadRequest("The specified ServiceId does not exist.");

            var newBooking = new BookingService
            {
                Service = dto.Service,
                Date = dto.Date,
                DetailsProblem = dto.DetailsProblem,
                Status = dto.Status,
                Userid = dto.UserId,
                Serviceid = dto.ServiceId
            };

            _db.BookingServices.Add(newBooking);
            _db.SaveChanges();

            return Ok(new { Message = "Booking created successfully.", BookingId = newBooking.BookingServiceId });
        }


        [HttpGet("getbooking/{id}")]
        public IActionResult GetBookingById(int id)
        {
            var booking = _db.BookingServices.Where(b => b.Userid == id)
                .Include(x => x.User)
                .Select(x => new
                {
                    username = x.User.FisrtName + " " + x.User.LastName,
                    x.User.Emailaddress,
                    x.User.City,
                    x.User.Phone,
                    x.Service,
                    x.BookingServiceId,
                    x.Date,
                    x.DetailsProblem,
                    x.Status,
                    x.Serviceid,
                    x.Userid,

                });

            if (booking == null)
                return NotFound("Booking not found.");


            return Ok(booking);
        }

        [HttpPut("updatebooking/{id}")]
        public IActionResult UpdateBooking(int id, [FromBody] BookingServiceDTO dto)
        {
            var booking = _db.BookingServices.FirstOrDefault(b => b.BookingServiceId == id);

            if (booking == null)
                return NotFound("Booking not found.");

            booking.Service = dto.Service;
            booking.Date = dto.Date;
            booking.DetailsProblem = dto.DetailsProblem;
            booking.Status = dto.Status;
            booking.Userid = dto.UserId;
            booking.Serviceid = dto.ServiceId;

            _db.SaveChanges();

            return Ok(new { Message = "Booking updated successfully." });
        }

        [HttpDelete("deletebooking/{id}")]
        public IActionResult DeleteBooking(int id)
        {
            var booking = _db.BookingServices.FirstOrDefault(b => b.BookingServiceId == id);

            if (booking == null)
                return NotFound("Booking not found.");

            _db.BookingServices.Remove(booking);
            _db.SaveChanges();

            return Ok(new { Message = "Booking deleted successfully." });
        }

        [HttpGet("GetBookingsByUserId/{userId}")]
        public IActionResult GetBookingsByUserId(int userId)
        {
            var bookings = _db.Services
                .Include(s => s.BookingServices) // Include BookingServices
                .ThenInclude(bs => bs.User) // Include User from BookingServices
                .Where(s => s.Userid == userId) // Filter by UserId
                .Select(s => new
                {
                    BookingServices = s.BookingServices.Select(bs => new
                    {
                        bs.Service,
                        bs.BookingServiceId,
                        bs.Date,
                        bs.DetailsProblem,
                        bs.Status,
                        bs.Serviceid,
                        bs.Userid,
                     
                        User = new
                        {
                            Username = bs.User.FisrtName + " " + bs.User.LastName, // Concatenate first and last name
                           
                            bs.User.Emailaddress,
                            bs.User.Phone,
                            bs.User.City
                        }
                    }).ToList()
                })
                .ToList();

            if (!bookings.Any())
            {
                return NotFound($"No bookings found for UserId: {userId}");
            }

            return Ok(bookings);
        }

        [HttpPut("editorder/{id}")]
        public IActionResult editorder(int id, ChangeStatus DTO)
        {
            var edit = _db.BookingServices.Where(x => x.BookingServiceId == id).FirstOrDefault();
            edit.Status = DTO.Status;
            _db.BookingServices.Update(edit);
            _db.SaveChanges();


            return Ok(edit);
        }


    }
}

