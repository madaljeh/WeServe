using WeServe.Models;

namespace WeServe.DTO
{
    public class registerDTO
    {

        public string UserName { get; set; } = null!;

        public string FisrtName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string Gender { get; set; } = null!;

        public string Phone { get; set; } = null!;

        public string City { get; set; } = null!;

        public string? JobTitle { get; set; }

        public string? Experience { get; set; }


        //public bool? RoleId { get; set; }

        public string? Emailaddress { get; set; }

        public string? Password { get; set; }

       
    }
}
