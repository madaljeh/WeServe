using Microsoft.AspNetCore.Mvc;
using WeServe.DTO;
using WeServe.Models;
using System.Linq;

namespace WeServe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly MyDbContext _db;

        public RegisterController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("getallusers/{id}")]
        public IActionResult GetAllUsers(int id)
        {
            var users = _db.Users.Where(x => x.IdPerson == id).ToList();
            return Ok(users);
        }

        [HttpGet("getallusersinfo")]
        public IActionResult GetAllUsers1()
        {
            var users = _db.Users.ToList();
            return Ok(users);
        }

        [HttpPost("register")]
        public IActionResult Register([FromForm] registerDTO dto)
        {
            if (dto == null)
                return BadRequest("Invalid registration data.");

            var isProvider = !string.IsNullOrEmpty(dto.JobTitle) &&
                             !string.IsNullOrEmpty(dto.Experience) &&
                             dto.PricePerHour.HasValue;

            var newUser = new User
            {
                UserName = dto.UserName,
                FisrtName = dto.FisrtName,
                LastName = dto.LastName,
                Emailaddress = dto.Emailaddress,
                Gender = dto.Gender,
                Phone = dto.Phone,
                City = dto.City,
                JobTitle = dto.JobTitle,
                Experience = dto.Experience,
                PricePerHour = dto.PricePerHour,
                RoleId = isProvider,
                Password = dto.Password,
            };

            _db.Users.Add(newUser);
            _db.SaveChanges();

            return Ok(new
            {
                Message = "User registered successfully.",
                Role = isProvider ? "Service Provider" : "Customer"
            });
        }

        [HttpPost("login")]
        public IActionResult Login(loginDTO dto)
        {
            if (dto == null)
                return BadRequest("Invalid request data.");

            var user = _db.Users.FirstOrDefault(x => x.Emailaddress == dto.Emailaddress);
            if (user == null)
                return NotFound("User not found.");

            if (user.Password != dto.Password)
                return Unauthorized("Invalid password.");

            return Ok(user);
        }
        //
        //
    }
}
