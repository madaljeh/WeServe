﻿using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("getservice/{id}")]
        public IActionResult GetServiceById(int id)
        {
            var service = _db.Services.FirstOrDefault(s => s.Serviceid == id);


            return Ok(service);
        }

        [HttpPut("updateservice/{id}")]
        public IActionResult UpdateService(int id, [FromForm] AddServiceDTO dto)
        {
            var service = _db.Services.Find(id);

            if (service == null)
                return NotFound("Service not found.");

            service.ServiceProvidername = dto.ServiceProviderName??service.ServiceProvidername;
            
            service.Priceperhour = dto.Priceperhour ?? service.Priceperhour;
            _db.Services.Update(service);
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



