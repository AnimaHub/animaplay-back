using AnimaPlayBack.Models.Enumerators;
using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Dtos
{
    public class PartnerDTO : LoginDTO
    {
        public PartnerDTO(string username, int phonenumber, string email, string password, string repassword, DateTime birthDate, UserTypeEnum userType, string cep, string street, string neighborhood, string city, string state) : base(username, phonenumber, email, password, repassword, birthDate, userType)
        {
            Cep = cep;
            Street = street;
            Neighborhood = neighborhood;
            City = city;
            State = state;
        }

        [Required]
        public string Cep { get; set; }
        [Required]
        public string Street { get; set; }
        [Required]
        public string Neighborhood { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
    }
}
