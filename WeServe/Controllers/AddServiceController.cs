using Microsoft.AspNetCore.Mvc;
using WeServe.DTO;
using WeServe.Models;
using System.Linq;

namespace WeServe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddServiceController : ControllerBase
    {
        private readonly MyDbContext _db;

        public AddServiceController(MyDbContext db)
        {
            _db = db;
        }



        //[HttpGet("getallservices")]
        //public IActionResult GetAllServices()
        //{
        //    var services = _db.Services.Select(s => new AddServiceDTO
        //    {
        //        ServiceId = s.Serviceid,
        //        ServiceProviderName = s.ServiceProvidername,
        //        UserId = s.Userid
        //    }).ToList();

        //    return Ok(services);
        //}

        [HttpPost("createservice")]
        public IActionResult CreateService([FromBody] AddServiceDTO dto)
        {
            if (dto == null)
                return BadRequest("Invalid service data.");

            var newService = new Service
            {
                ServiceProvidername = dto.ServiceProviderName,
                Userid = dto.UserId,
                Priceperhour=dto.Priceperhour
            };

            _db.Services.Add(newService);
            _db.SaveChanges();

            return Ok(new { Message = "Service created successfully.", ServiceId = newService.Serviceid });
        }

        [HttpGet("getallservicebyuserID/{id}")]
        public IActionResult getallservicebyuserID(int id)
        {
            var service = _db.Services.Where(x => x.Userid == id).ToList();
            return Ok(service);
        }

        //[HttpGet("getservice/{id}")]
        //public IActionResult GetServiceById(int id)
        //{
        //    var service = _db.Services.FirstOrDefault(s => s.Serviceid == id);

        //    if (service == null)
        //        return NotFound("Service not found.");

        //    var serviceDto = new AddServiceDTO
        //    {
        //        ServiceId = service.Serviceid,
        //        ServiceProviderName = service.ServiceProvidername,
        //        UserId = service.Userid
        //    };

        //    return Ok(serviceDto);
        //}

        [HttpPut("updateservice/{id}")]
        public IActionResult UpdateService(int id, [FromBody] AddServiceDTO dto)
        {
            var service = _db.Services.FirstOrDefault(s => s.Serviceid == id);

            if (service == null)
                return NotFound("Service not found.");

            service.ServiceProvidername = dto.ServiceProviderName;
            service.Userid = dto.UserId;

            _db.SaveChanges();

            return Ok(new { Message = "Service updated successfully." });
        }

        [HttpDelete("deleteservice/{id}")]
        public IActionResult DeleteService(int id)
        {
            var service = _db.Services.FirstOrDefault(s => s.Serviceid == id);

            if (service == null)
                return NotFound("Service not found.");

            _db.Services.Remove(service);
            _db.SaveChanges();

            return Ok(new { Message = "Service deleted successfully." });
        }



    }




}



