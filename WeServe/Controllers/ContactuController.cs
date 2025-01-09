using Microsoft.AspNetCore.Mvc;
using WeServe.DTO;
using WeServe.Models;
using System.Linq;

namespace WeServe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactuController : ControllerBase
    {
        private readonly MyDbContext _db;

        public ContactuController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("getallcontacts")]
        public IActionResult GetAllContacts()
        {
            var contacts = _db.Contactus.Select(c => new ContactuDTO
            {
                Id = c.Id,
                Fullname = c.Fullname,
                Email = c.Email,
                Phonenumber = c.Phonenumber,
                Massage = c.Massage
            }).ToList();

            return Ok(contacts);
        }

        [HttpPost("createcontact")]
        public IActionResult CreateContact([FromBody] ContactuDTO dto)
        {
            if (dto == null)
                return BadRequest("Invalid contact data.");

            var newContact = new Contactu
            {
                Fullname = dto.Fullname,
                Email = dto.Email,
                Phonenumber = dto.Phonenumber,
                Massage = dto.Massage
            };

            _db.Contactus.Add(newContact);
            _db.SaveChanges();

            return Ok(new { Message = "Contact created successfully.", ContactId = newContact.Id });
        }

        [HttpGet("getcontact/{id}")]
        public IActionResult GetContactById(int id)
        {
            var contact = _db.Contactus.FirstOrDefault(c => c.Id == id);

            if (contact == null)
                return NotFound("Contact not found.");

            var contactDto = new ContactuDTO
            {
                Id = contact.Id,
                Fullname = contact.Fullname,
                Email = contact.Email,
                Phonenumber = contact.Phonenumber,
                Massage = contact.Massage
            };

            return Ok(contactDto);
        }

        [HttpPut("updatecontact/{id}")]
        public IActionResult UpdateContact(int id, [FromBody] ContactuDTO dto)
        {
            var contact = _db.Contactus.FirstOrDefault(c => c.Id == id);

            if (contact == null)
                return NotFound("Contact not found.");

            contact.Fullname = dto.Fullname;
            contact.Email = dto.Email;
            contact.Phonenumber = dto.Phonenumber;
            contact.Massage = dto.Massage;

            _db.SaveChanges();

            return Ok(new { Message = "Contact updated successfully." });
        }

        [HttpDelete("deletecontact/{id}")]
        public IActionResult DeleteContact(int id)
        {
            var contact = _db.Contactus.FirstOrDefault(c => c.Id == id);

            if (contact == null)
                return NotFound("Contact not found.");

            _db.Contactus.Remove(contact);
            _db.SaveChanges();

            return Ok(new { Message = "Contact deleted successfully." });
        }
    }
}
