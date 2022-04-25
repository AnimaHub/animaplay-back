using System.ComponentModel.DataAnnotations;

namespace AnimaPlayBack.Dtos
{
    public class AddressDTO
    {
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
