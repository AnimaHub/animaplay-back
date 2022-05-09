using AnimaPlayBack.Models.Enumerators;
using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Dtos
{
    public class PartnerDTO : LoginDTO
    {
        public PartnerDTO(string username, int phonenumber, string email, string password, string repassword, DateTime birthDate, UserTypeEnum userType, string jobRole, AddressDTO address) : base(username, phonenumber, email, password, repassword, birthDate, userType)
        {
            JobRole = jobRole;
            Address = address;
        }

        [Required]
        public string JobRole { get; set; }
        [Required]
        public AddressDTO Address { get; set; }
    }
}
